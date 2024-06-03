package com.amitesh.shop.application.port.in.product;

import com.amitesh.shop.application.port.in.cart.ItemInCartException;
import com.amitesh.shop.application.port.in.cart.ProductNotFoundException;
import com.amitesh.shop.model.product.ProductId;
import org.springframework.stereotype.Service;

@Service
public interface RemoveProductsUseCase {

  void delete(ProductId productId) throws ProductNotFoundException, ItemInCartException;

}
