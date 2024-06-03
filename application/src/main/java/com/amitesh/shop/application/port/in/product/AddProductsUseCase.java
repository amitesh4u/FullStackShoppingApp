package com.amitesh.shop.application.port.in.product;

import com.amitesh.shop.model.product.Product;
import org.springframework.stereotype.Service;

@Service
public interface AddProductsUseCase {

  Product save(Product product);

}
