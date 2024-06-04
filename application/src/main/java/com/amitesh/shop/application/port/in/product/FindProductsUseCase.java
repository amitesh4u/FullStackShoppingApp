package com.amitesh.shop.application.port.in.product;

import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public interface FindProductsUseCase {

  List<Product> findAll();

  Optional<Product> findById(ProductId productId);

  /* Query must be at least 2 characters long */
  List<Product> findByNameOrDescription(String query);
}
