package com.amitesh.shop.bootstrap;

import lombok.CustomLog;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@CustomLog
public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		LOGGER.info("Adding custom properties");
		InitializationUtil.INSTANCE.setInitializationProperties();
		return application.sources(ShoppingApplication.class);
	}

}
