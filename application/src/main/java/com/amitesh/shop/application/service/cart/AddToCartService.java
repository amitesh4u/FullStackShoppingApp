package com.amitesh.shop.application.service.cart;

import com.amitesh.shop.application.port.in.cart.AddToCartUseCase;
import com.amitesh.shop.application.port.in.cart.ProductNotFoundException;
import com.amitesh.shop.application.port.out.persistence.CartRepository;
import com.amitesh.shop.application.port.out.persistence.ProductRepository;
import com.amitesh.shop.model.cart.Cart;
import com.amitesh.shop.model.cart.InsufficientStockException;
import com.amitesh.shop.model.cart.MaximumItemInCartException;
import com.amitesh.shop.model.customer.CustomerId;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import org.springframework.stereotype.Service;


@Service
public class AddToCartService implements AddToCartUseCase {

  private final CartRepository cartRepository;
  private final ProductRepository productRepository;

  public AddToCartService(
      CartRepository cartRepository, ProductRepository productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  @Override
  public Cart addToCart(CustomerId customerId, ProductId productId, int quantity)
      throws ProductNotFoundException, InsufficientStockException, MaximumItemInCartException {

    if (null == customerId) {
      throw new IllegalArgumentException("Invalid Customer. Id must not be null");
    }
    if (null == productId) {
      throw new IllegalArgumentException("Invalid Product. Id must not be null");
    }
    if (quantity < 1) {
      throw new IllegalArgumentException("Quantity must be greater than 0");
    }

    Product product = productRepository.findById(productId)
        .orElseThrow(ProductNotFoundException::new);

    Cart cart =
        cartRepository
            .findByCustomerId(customerId)
            .orElseGet(() -> new Cart(customerId));

    cart.addProduct(product, quantity);

    cartRepository.save(cart);

    return cart;
  }
}
