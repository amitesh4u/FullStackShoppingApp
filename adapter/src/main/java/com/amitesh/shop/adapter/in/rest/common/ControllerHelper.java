package com.amitesh.shop.adapter.in.rest.common;

import static org.apache.commons.lang3.math.NumberUtils.isCreatable;
import static org.apache.commons.lang3.math.NumberUtils.isDigits;

import com.amitesh.shop.model.customer.CustomerId;
import com.amitesh.shop.model.product.ProductId;
import java.util.Arrays;
import java.util.Currency;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;

/**
 * Common functionality for all REST controllers.
 */
public class ControllerHelper {

  private static final List<String> CURRENCY_CODE_LIST = Arrays.asList("INR", "EUR", "USD");

  private ControllerHelper() {
  }

  public static ClientErrorException clientErrorException(HttpStatus status, String message) {
    return new ClientErrorException(errorResponse(status, message));
  }

  public static ResponseEntity<ErrorEntity> errorResponse(HttpStatus status, String message) {
    ErrorEntity errorEntity = new ErrorEntity(status.value(), message);
    return ResponseEntity.status(status.value()).body(errorEntity);
  }

  public static CustomerId parseCustomerId(String customeridString) {
    try {
      return new CustomerId(Integer.parseInt(customeridString));
    } catch (IllegalArgumentException e) {
      throw clientErrorException(HttpStatus.BAD_REQUEST, "Invalid Customer " + customeridString);
    }
  }

  public static ProductId parseProductId(String productIdString) {
    try {
      return new ProductId(productIdString);
    } catch (IllegalArgumentException e) {
      throw clientErrorException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }

  public static boolean isValidProduct(String name, String description, String itemsInStock,
      String amount, String currencyCode) {
    if (StringUtils.hasText(name) && StringUtils.hasText(description)
        && null != itemsInStock && null != amount
        && StringUtils.hasText(currencyCode)) {

      if(name.length() > 50 || description.length() > 100){
        return false;
      }

      if (!CURRENCY_CODE_LIST.contains(currencyCode)) {
        return false;
      }

      try {
        Currency.getInstance(currencyCode);
      } catch (Exception e) {
        return false;
      }

      if (!isDigits(itemsInStock) || Integer.parseInt(itemsInStock) < 1) {
        return false;
      }

      if (!isCreatable(amount) || Double.parseDouble(amount) < 1) {
        return false;
      }

      /* Finally return true */
      return true;
    }

    return false;
  }
}
