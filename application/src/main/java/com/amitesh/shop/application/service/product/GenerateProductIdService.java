package com.amitesh.shop.application.service.product;


import com.amitesh.shop.application.port.in.product.GenerateProductIdUseCase;
import org.springframework.stereotype.Service;

@Service
public class GenerateProductIdService implements GenerateProductIdUseCase {

  @Override
  public String generateProductId() {
    return Long.toHexString(System.currentTimeMillis());
  }
}
