package com.lr.manage.freemarker;

import org.springframework.web.servlet.view.AbstractTemplateViewResolver;
import org.springframework.web.servlet.view.AbstractUrlBasedView;

/**
 * ViewResolver for RichFreeMarkerView
 * 
 * Override buildView, if viewName start with / , then ignore prefix.
 * 
 * @author liufang
 * 
 */
public class OwnFreeMarkerViewResolver extends AbstractTemplateViewResolver {
	/**
	 * Set default viewClass
	 */
	public OwnFreeMarkerViewResolver() {
		setViewClass(OwnFreeMarkerView.class);
	}

	/**
	 * if viewName start with / , then ignore prefix.
	 */
	@Override
	protected AbstractUrlBasedView buildView(String viewName) throws Exception {
		AbstractUrlBasedView view = super.buildView(viewName);
		// start with / ignore prefix
		if (viewName.startsWith("/")) {
			view.setUrl(viewName + getSuffix());
		}
		return view;
	}

	public static void main(String[] args) {
		System.out.println(AbstractTemplateViewResolver.class.isAssignableFrom(OwnFreeMarkerViewResolver.class));
	}
}