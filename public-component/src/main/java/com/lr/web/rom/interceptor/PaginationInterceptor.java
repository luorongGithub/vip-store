package com.lr.web.rom.interceptor;

import com.lr.web.rom.annotation.Page;
import com.lr.web.rom.interceptor.dialect.IDBDialect;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.executor.ErrorContext;
import org.apache.ibatis.executor.ExecutorException;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.property.PropertyTokenizer;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.scripting.xmltags.ForEachSqlNode;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.TypeHandler;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * INFO: 分页查询
 * User: zhaokai
 * Date: 2016/2/18 - 14:19
 * Version: 1.0
 * History: <p>如果有修改过程，请记录</P>
 */
@Intercepts({@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class})})
public class PaginationInterceptor implements Interceptor {
    private final static Logger LOG = LoggerFactory
            .getLogger(PaginationInterceptor.class);

    private IDBDialect dialect;

    private Properties properties;

    @SuppressWarnings("unchecked")
    public Object intercept(Invocation invocation) throws Throwable {
        if (this.dialect == null) {
            return invocation.proceed();
        }

        final RoutingStatementHandler statementHandler = (RoutingStatementHandler) invocation
                .getTarget();
        final MetaObject metaStatementHandler = MetaObject.forObject(statementHandler, new DefaultObjectFactory(), new DefaultObjectWrapperFactory());
        final MappedStatement mappedStatement = (MappedStatement) metaStatementHandler
                .getValue("delegate.mappedStatement");
        final BoundSql boundSql = (BoundSql) metaStatementHandler
                .getValue("delegate.boundSql");
        final Object paramter = boundSql.getParameterObject();
        if (paramter == null) {
            return invocation.proceed();
        }
        if (paramter instanceof Map) {
            Map<String, Object> parameterObject = (Map<String, Object>) paramter;
            for (Object e : parameterObject.values()) {
                if (e == null)
                    continue;
                Page anno = e.getClass().getAnnotation(Page.class);
                if (anno != null) {
                    Connection connection = (Connection) invocation.getArgs()[0];
                    String sql = boundSql.getSql();
                    String countSql = "SELECT COUNT(1) FROM ( " + sql +" ) temp_count";
                    PreparedStatement countStmt = connection
                            .prepareStatement(countSql);
                    BoundSql countBS = new BoundSql(
                            mappedStatement.getConfiguration(), countSql,
                            boundSql.getParameterMappings(), parameterObject);
                    this.setParameters(countStmt, mappedStatement, countBS,
                            parameterObject);
                    ResultSet rs = countStmt.executeQuery();
                    try {
                        Method m = e.getClass().getMethod(
                                "set" + StringUtils.capitalize(anno.total()),
                                new Class<?>[]{long.class});
                        if (rs.next()) {
                            m.invoke(e, rs.getInt(1));
                        }

                        final int page = (Integer) e
                                .getClass()
                                .getMethod(
                                        "get"
                                                + StringUtils.capitalize(anno
                                                .page()),
                                        new Class<?>[0])
                                .invoke(e, new Object[0]);
                        final int size = (Integer) e
                                .getClass()
                                .getMethod(
                                        "get"
                                                + StringUtils.capitalize(anno
                                                .rows()),
                                        new Class<?>[0])
                                .invoke(e, new Object[0]);

                        metaStatementHandler
                                .setValue(
                                        "delegate.boundSql.sql",
                                        this.dialect.getPaginationSQL(
                                                (String) metaStatementHandler
                                                        .getValue("delegate.boundSql.sql"),
                                                page, size));
                        return invocation.proceed();
                    } finally {
                        if (rs != null)
                            rs.close();
                        if (countStmt != null)
                            countStmt.close();
                    }
                }
            }
        } else if (paramter.getClass().getAnnotation(Page.class) != null) {
            Page anno = paramter.getClass().getAnnotation(Page.class);

            Connection connection = (Connection) invocation.getArgs()[0];
            String sql = boundSql.getSql();
            String countSql = "SELECT COUNT(1) FROM ( " + sql +" ) temp_count";
            PreparedStatement countStmt = connection.prepareStatement(countSql);
            BoundSql countBS = new BoundSql(mappedStatement.getConfiguration(),
                    countSql, boundSql.getParameterMappings(), paramter);
            this.setParameters(countStmt, mappedStatement, countBS, paramter);
            ResultSet rs = countStmt.executeQuery();
            try {
                Method m = paramter.getClass().getMethod(
                        "set" + StringUtils.capitalize(anno.total()),
                        new Class<?>[]{long.class});
                if (rs.next()) {
                    m.invoke(paramter, rs.getInt(1));
                }

                final int page = (Integer) paramter
                        .getClass()
                        .getMethod("get" + StringUtils.capitalize(anno.page()),
                                new Class<?>[0])
                        .invoke(paramter, new Object[0]);
                final int size = (Integer) paramter
                        .getClass()
                        .getMethod("get" + StringUtils.capitalize(anno.rows()),
                                new Class<?>[0])
                        .invoke(paramter, new Object[0]);

                metaStatementHandler.setValue("delegate.boundSql.sql",
                        this.dialect.getPaginationSQL(
                                (String) metaStatementHandler
                                        .getValue("delegate.boundSql.sql"),
                                page, size));
                return invocation.proceed();
            } finally {
                if (rs != null)
                    rs.close();
                if (countStmt != null)
                    countStmt.close();
            }

        }
        return invocation.proceed();
    }

    public Object plugin(Object target) {
        if (target instanceof StatementHandler) {
            return Plugin.wrap(target, this);
        } else {
            return target;
        }
    }

    @SuppressWarnings("unchecked")
    public void setProperties(Properties properties) {
        this.properties = properties;
        if (this.properties.containsKey("DBDialect")) {
            try {
                Class<IDBDialect> target = (Class<IDBDialect>) Class
                        .forName(properties.getProperty("DBDialect"));
                this.dialect = target.newInstance();
            } catch (Exception e) {
                LOG.error(e.getMessage(), e);
            }
        }
    }

    /**
     * @return the properties
     */
    public final Properties getProperties() {
        return properties;
    }

    @SuppressWarnings("unchecked")
    private void setParameters(PreparedStatement ps,
                               MappedStatement mappedStatement, BoundSql boundSql,
                               Object parameterObject) throws SQLException {
        ErrorContext.instance().activity("setting parameters")
                .object(mappedStatement.getParameterMap().getId());
        List<ParameterMapping> parameterMappings = boundSql
                .getParameterMappings();
        if (parameterMappings != null) {
            Configuration configuration = mappedStatement.getConfiguration();
            TypeHandlerRegistry typeHandlerRegistry = configuration
                    .getTypeHandlerRegistry();
            MetaObject metaObject = parameterObject == null ? null
                    : configuration.newMetaObject(parameterObject);
            for (int i = 0; i < parameterMappings.size(); i++) {
                ParameterMapping parameterMapping = parameterMappings.get(i);
                if (parameterMapping.getMode() != ParameterMode.OUT) {
                    Object value;
                    String propertyName = parameterMapping.getProperty();
                    PropertyTokenizer prop = new PropertyTokenizer(propertyName);
                    if (parameterObject == null) {
                        value = null;
                    } else if (typeHandlerRegistry
                            .hasTypeHandler(parameterObject.getClass())) {
                        value = parameterObject;
                    } else if (boundSql.hasAdditionalParameter(propertyName)) {
                        value = boundSql.getAdditionalParameter(propertyName);
                    } else if (propertyName
                            .startsWith(ForEachSqlNode.ITEM_PREFIX)
                            && boundSql.hasAdditionalParameter(prop.getName())) {
                        value = boundSql.getAdditionalParameter(prop.getName());
                        if (value != null) {
                            value = configuration.newMetaObject(value)
                                    .getValue(
                                            propertyName.substring(prop
                                                    .getName().length()));
                        }
                    } else {
                        value = metaObject == null ? null : metaObject
                                .getValue(propertyName);
                    }
                    @SuppressWarnings("rawtypes")
                    TypeHandler typeHandler = parameterMapping.getTypeHandler();
                    if (typeHandler == null) {
                        throw new ExecutorException(
                                "There was no TypeHandler found for parameter "
                                        + propertyName + " of statement "
                                        + mappedStatement.getId());
                    }
                    typeHandler.setParameter(ps, i + 1, value,
                            parameterMapping.getJdbcType());
                }
            }
        }
    }

}