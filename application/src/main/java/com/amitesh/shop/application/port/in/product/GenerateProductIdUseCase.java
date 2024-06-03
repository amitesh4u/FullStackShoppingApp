package com.amitesh.shop.application.port.in.product;

import org.springframework.stereotype.Service;

@Service
public interface GenerateProductIdUseCase {

  String generateProductId();

}
