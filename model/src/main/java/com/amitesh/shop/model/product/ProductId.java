package com.amitesh.shop.model.product;

import org.springframework.util.StringUtils;

public record ProductId(String value) {

  public ProductId {
    if (!StringUtils.hasText(value )) {
      throw new IllegalArgumentException("Invalid Product. Id must not be null or empty");
    }
  }
}
