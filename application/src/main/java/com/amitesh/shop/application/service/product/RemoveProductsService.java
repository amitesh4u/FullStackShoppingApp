package com.amitesh.shop.application.service.product;

import com.amitesh.shop.application.port.in.cart.ProductNotFoundException;
import com.amitesh.shop.application.port.in.product.RemoveProductsUseCase;
import com.amitesh.shop.application.port.out.persistence.ProductRepository;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import org.springframework.stereotype.Service;

@Service
public class RemoveProductsService implements RemoveProductsUseCase {

  private final ProductRepository productRepository;

  public RemoveProductsService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public void delete(ProductId productId) throws ProductNotFoundException {
    Product product = productRepository.findById(productId)
        .orElseThrow(ProductNotFoundException::new);
    productRepository.delete(product);
  }
}
