package com.amitesh.shop.application.service.product;

import com.amitesh.shop.application.port.in.product.FindProductsUseCase;
import com.amitesh.shop.application.port.out.persistence.ProductRepository;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class FindProductsService implements FindProductsUseCase {

  private final ProductRepository productRepository;

  public FindProductsService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public List<Product> findAll() {
    return productRepository.findAll();
  }

  @Override
  public Optional<Product> findById(ProductId productId) {
    return productRepository.findById(productId);
  }

  @Override
  public List<Product> findByNameOrDescription(String query) {
    if (null == query || query.length() < 3) {
      throw new IllegalArgumentException("Search Query must be at least three characters long");
    }
    return productRepository.findByNameOrDescription(query);
  }
}
