package com.amitesh.shop.application.port.in.cart;

import com.amitesh.shop.model.customer.CustomerId;
import org.springframework.stereotype.Service;

@Service
public interface EmptyCartUseCase {

  void emptyCart(CustomerId customerId);
}
