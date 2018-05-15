package com.lr.web.freemarker;

import com.alibaba.fastjson.JSONObject;
import com.lr.web.result.AjaxResult;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * INFO: 自定义 异常处理类
 * User: zhaokai
 * Date: 2016/9/9 - 10:19
 * Version: 1.0
 * History: <p>如果有修改过程，请记录</P>
 */

public class OwnSimpleMappingExceptionResolver extends SimpleMappingExceptionResolver {


    private static Log logger = LogFactory.getLog(OwnSimpleMappingExceptionResolver.class);

    @Override
    protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response,
                                              Object handler, Exception ex) {
        // Expose ModelAndView for chosen error view.
        String viewName = determineViewName(ex, request);
        if (viewName != null) {// JSP格式返回
            if (!(request.getHeader("accept").indexOf("application/json") > -1 || (request
                    .getHeader("X-Requested-With") != null && request
                    .getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1))) {
                // 如果不是异步请求
                // Apply HTTP status code for error views, if specified.
                // Only apply it if we're processing a top-level request.
                Integer statusCode = determineStatusCode(request, viewName);
                if (statusCode != null) {
                    applyStatusCodeIfPossible(request, response, statusCode);
                }
                return getModelAndView(viewName, ex, request);
            } else {// JSON格式返回
                PrintWriter writer = null;
                try {
                    writer = response.getWriter();
                    writer.write(JSONObject.toJSONString(AjaxResult.failed(ex.getMessage())));
                    writer.flush();

                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    if (null != writer) {
                        writer.close();
                    }
                }
                return null;

            }
        } else {
            return null;
        }
    }
}

