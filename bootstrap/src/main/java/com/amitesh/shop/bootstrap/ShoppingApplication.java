package com.amitesh.shop.bootstrap;

import lombok.CustomLog;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@CustomLog
@SpringBootApplication(scanBasePackages = "com.amitesh.shop")
public class ShoppingApplication {

  public static void main(String[] args) {
    LOGGER.info("Starting application");
    SpringApplication.run(ShoppingApplication.class, args);
  }

}
