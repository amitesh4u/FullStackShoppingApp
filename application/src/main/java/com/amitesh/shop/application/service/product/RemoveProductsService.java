package com.amitesh.shop.application.service.product;

import com.amitesh.shop.application.port.in.cart.ItemInCartException;
import com.amitesh.shop.application.port.in.cart.ProductNotFoundException;
import com.amitesh.shop.application.port.in.product.RemoveProductsUseCase;
import com.amitesh.shop.application.port.out.persistence.CartRepository;
import com.amitesh.shop.application.port.out.persistence.ProductRepository;
import com.amitesh.shop.model.cart.Cart;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RemoveProductsService implements RemoveProductsUseCase {

  private final ProductRepository productRepository;

  private final CartRepository cartRepository;

  public RemoveProductsService(ProductRepository productRepository, CartRepository cartRepository) {
    this.productRepository = productRepository;
    this.cartRepository = cartRepository;
  }

  @Override
  public void delete(ProductId productId) throws ProductNotFoundException, ItemInCartException {
    Product product = productRepository.findById(productId)
        .orElseThrow(ProductNotFoundException::new);
    List<Cart> carts = cartRepository.findAll();

    /* Checking if Product is in any Cart. Ignore deletion */
    /* The logic can be implement with regular For loop */
    try {
      carts.forEach(o -> o.lineItems().forEach(i -> {
        if (i.product().id().equals(productId)) {
          throw new RuntimeException();
        }
      }));
    } catch(RuntimeException e){
      throw new ItemInCartException();
    }
    productRepository.delete(product);
  }
}
