package com.lr.manage.common.util;

import com.sun.javafx.binding.StringFormatter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Map;

/**
 * 
 * 
 * 类名称：AntiXssFilter
 * 
 * @version 类描述：基于黑名单的xss过滤器
 * @version 创建人：zhuzheng
 * @version 创建时间：2015年11月3日 下午1:00:11
 * @version 修改人：zhuzheng 修改时间：2015年11月3日 下午1:00:11
 * @version 修改备注：
 *
 */
public class AntiXssFilter implements Filter {
    private static Log logger = LogFactory.getLog(AntiXssFilter.class);
    public void destroy() {

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        Map<String, String[]> parameterMap = req.getParameterMap();
        String method = req.getMethod();
        String url = req.getRequestURI();
        for (Object key : parameterMap.keySet()) {
            String[] val = (String[]) parameterMap.get(key);
            for (String v : val) {
                if (method.equalsIgnoreCase("get")) {// 处理get请求时的编码问题
                    v = URLDecoder.decode(URLDecoder.decode(v, "utf-8"), "utf-8");
                }
                if (AntXssUtil.existsXssElement(v)) {
                    HttpServletResponse res = (HttpServletResponse) response;
                    logger.error(StringFormatter.format("参数非法url:{},请求:{}", req.getRequestURL(), v));
                    res.sendRedirect(req.getContextPath() + "/error/400.html");
                    return;
                }
            }
        }
        chain.doFilter(request, response);
    }

    public void init(FilterConfig arg0) throws ServletException {

    }
}
