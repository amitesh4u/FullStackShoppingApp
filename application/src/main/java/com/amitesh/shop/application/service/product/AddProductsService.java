package com.amitesh.shop.application.service.product;

import com.amitesh.shop.application.port.in.product.AddProductsUseCase;
import com.amitesh.shop.application.port.out.persistence.ProductRepository;
import com.amitesh.shop.model.product.Product;
import org.springframework.stereotype.Service;

@Service
public class AddProductsService implements AddProductsUseCase {

  private final ProductRepository productRepository;

  public AddProductsService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public Product save(Product product) {
    return productRepository.save(product);
  }
}
