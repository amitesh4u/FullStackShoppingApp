package com.amitesh.shop.application.port.in.cart;

import com.amitesh.shop.model.cart.Cart;
import com.amitesh.shop.model.customer.CustomerId;
import org.springframework.stereotype.Service;

@Service
public interface GetCartUseCase {

  Cart getCart(CustomerId customerId);
}
