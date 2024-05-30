package com.amitesh.shop.bootstrap;

//import com.amitesh.shop.SpringAppConfig;
import lombok.CustomLog;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@CustomLog
@SpringBootApplication(scanBasePackages = "com.amitesh.shop")
public class ShoppingApplication {

  public static void main(String[] args) {
    LOGGER.info("Starting application");
    //InitializationUtil.INSTANCE.setInitializationProperties();
    SpringApplication.run(ShoppingApplication.class, args);
  }
}
