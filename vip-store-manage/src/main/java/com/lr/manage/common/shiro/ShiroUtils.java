/**
 * 
 */
package com.lr.manage.common.shiro;

import com.lr.manage.common.shiro.dto.LoginUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Administrator
 * 
 */
public class ShiroUtils {
    private static final Logger logger = LoggerFactory.getLogger(ShiroUtils.class);
    public static final String AUTHORIZATION_KEY = "_authorization_key";
    public static final String AUTHORIZATION_OPERATORID_KEY = "_authorization_operatorID_key";
    public static final String AUTHORIZATION_EXCEPTION_KEY = "_authorization_error";
    public static final String ORIGIN_NAME_KEY = "origin_name_key";
    public static final String ORIGIN_IP_KEY = "origin_ip_key";
    public static final String CURRENT_USER_KEY = "currentUser";
    public static final String CURRENT_ACCOUNT_TYPE = "accountType";
    public static final String CURRENT_EMP_DETAIL = "empDetail";
    public static final String ROLE_CONDITION= "role_condition";

    public static LoginUser getCurrentUser() {
        try {
            return (LoginUser) ShiroUtils.getSessionAttribute(CURRENT_USER_KEY);
        } catch (Exception e) {

        }
        return null;
    }

    /**
     * 获取当前用户shiro Session
     * 
     * @return
     */
    public static Session getSession() {
        try {
            return SecurityUtils.getSubject().getSession();
        } catch (Exception e) {

            return null;
        }
    }

    /**
     * 获取会话中的值
     * 
     * @return
     */
    public static Object getSessionAttribute(String key) {
        try {
            return SecurityUtils.getSubject().getSession().getAttribute(key);
        } catch (Exception e) {

        }
        return null;
    }

    /**
     * 是否认证
     * 
     * @return
     */
    public static boolean isAuthenticated() {
        try {
            return SecurityUtils.getSubject().isAuthenticated();
        } catch (Exception e) {

            return false;
        }
    }

    /**
     * 删除会话中的值
     * 
     * @param key
     */
    public static void removeSessionAttribute(String key) {
        try {
            SecurityUtils.getSubject().getSession().removeAttribute(key);
        } catch (Exception e) {

        }
    }

    /**
     * 取得当前用户的登录名, 如果当前用户未登录则返回空字符串.
     */
    public static String getCurrentUserName() {
        String username = "";
        try {
            username = ShiroUtils.getCurrentUser() == null ? null : ShiroUtils.getCurrentUser().getUserName();
        } catch (Exception e) {

        }
        if (username == null) {
            username = "anonymousUser";
        }
        return username;

    }

    /**
     * 取得当前用户的ID, 如果当前用户未登录则返回空字符串.
     */
    public static Long getCurrentUserId() {
        Long userId = null;
        try {
            userId = ShiroUtils.getCurrentUser() == null ? null : ShiroUtils.getCurrentUser().getId();
        } catch (Exception e) {

        }
        return userId;

    }

    /**
     * 取得当前用户登录IP, 如果当前用户未登录则返回空字符串.
     */
    public static String getCurrentUserIp() {
        String ip = "";
        try {
            ip = (String) ShiroUtils.getSessionAttribute(ShiroUtils.ORIGIN_IP_KEY);
        } catch (Exception e) {

        }
        return ip;
    }

    /**
     * 判断用户是否拥有角色, 如果用户拥有参数中的任意一个角色则返回true.
     */
    public static boolean hasAnyRole(String... roles) {
        return false;
    }

    /**
     * 获取市场ID
     * 
     * @return
     */
    public static String getMarketID() {
        return null;
    }

    /**
     * 获取用户名
     * 
     * @param username
     * @return
     */
    public static String getRealUserName(String username) {
        if (username == null) {
            return "";
        }
        if (username.indexOf("$") != -1) {
            String[] strs = username.split("\\$");
            if (strs.length > 1) {
                username = strs[0];
            }
        }
        if (username.indexOf("^") != -1) {
            String[] strs = username.split("\\^");
            if (strs.length > 1) {
                username = strs[0];
            }
        }
        // 如果是第三方登录，设置登录类型和匹配编码
        if (username.indexOf("~") != -1) {
            String[] strs = username.split("\\~");
            if (strs.length > 1) {
                username = strs[0];
            }
        }
        return username;
    }

    /**
     * 将用户相关信息放到SESSION中
     * 
     * @param key
     * @param value
     */
    public static void putToSession(Object key, Object value) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            if (null != session) {
                session.setAttribute(key, value);
            } else {

            }
        }
    }

    /**
     * 获取当前登录账户类型 1：管理员 0：普通
     * 
     * @名称 getAccountType
     * @描述 TODO
     * @返回类型 String
     * @日期 2016年9月27日 下午6:24:25
     * @创建人 hf
     * @更新人 hf
     *
     */
    public static int getAccountType() {
        int accountType = 0;
        try {
            Object accountTypeObj = ShiroUtils.getSessionAttribute(ShiroUtils.CURRENT_ACCOUNT_TYPE);
            accountType = Integer.parseInt(String.valueOf(accountTypeObj));
        } catch (Exception e) {
            logger.error("获取当前登录账户类型异常", e);
        }
        return accountType;
    }

    
}
