package com.amitesh.shop.application.port.in.cart;


import com.amitesh.shop.model.cart.Cart;
import com.amitesh.shop.model.cart.InsufficientStockException;
import com.amitesh.shop.model.cart.MaximumItemInCartException;
import com.amitesh.shop.model.customer.CustomerId;
import com.amitesh.shop.model.product.ProductId;
import org.springframework.stereotype.Service;

@Service
public interface AddToCartUseCase {

  Cart addToCart(CustomerId customerId, ProductId productId, int quantity)
      throws ProductNotFoundException, InsufficientStockException, MaximumItemInCartException;

}
