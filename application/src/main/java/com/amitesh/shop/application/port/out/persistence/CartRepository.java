package com.amitesh.shop.application.port.out.persistence;

import com.amitesh.shop.model.cart.Cart;
import com.amitesh.shop.model.customer.CustomerId;
import java.util.List;
import java.util.Optional;

public interface CartRepository {

  void save(Cart cart);

  Optional<Cart> findByCustomerId(CustomerId customerId);

  List<Cart> findAll();

  void deleteByCustomerId(CustomerId customerId);
}
