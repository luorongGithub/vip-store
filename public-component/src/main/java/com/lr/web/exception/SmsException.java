/**   
 * @Title: SmsException.java 
 * @Package: com.myph.common.exception
 * @company: 麦芽金服
 * @Description: TODO
 * @date 2016年9月7日 下午6:35:30 
 * @version V1.0   
 */
package com.lr.web.exception;

/**
 * 短信异常类
 * 
 * @ClassName: SmsException
 * @Description: TODO
 * @author hf
 * @date 2016年9月7日 下午6:35:30
 * 
 */
public class SmsException extends BaseException {

	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = -4604294797441636883L;

	public SmsException() {

		super();

	}

	public SmsException(String message, Throwable cause) {

		super(message, cause);

	}

	public SmsException(String message) {

		super(message);

	}

	public SmsException(Throwable cause) {

		super(cause);

	}

}
