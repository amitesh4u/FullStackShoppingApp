package com.amitesh.shop.application.port.in.product;

import com.amitesh.shop.model.product.Product;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface FindProductsUseCase {

  List<Product> findAll();

  /* Query must be at least 2 characters long */
  List<Product> findByNameOrDescription(String query);
}
