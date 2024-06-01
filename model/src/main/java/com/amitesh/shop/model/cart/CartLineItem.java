package com.amitesh.shop.model.cart;

import com.amitesh.shop.model.price.Price;
import com.amitesh.shop.model.product.Product;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Synchronized;
import lombok.ToString;
import lombok.experimental.Accessors;

@Getter
@Accessors(fluent = true)
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class CartLineItem {

  private final Product product;
  private int quantity;

  @Synchronized
  public void increaseQuantityBy(final int augend, final int itemsInStock)
      throws InsufficientStockException {
    if (augend < 1) {
      throw new IllegalArgumentException("You must add at least one item");
    }

    int newQuantity = quantity + augend;
    if (itemsInStock < augend) {
      throw new InsufficientStockException(
          "Product %s has less items in stock (%d) than the requested total quantity (%d)"
              .formatted(product.id(), product.itemsInStock(), newQuantity),
          product.itemsInStock());
    }
    product.itemsInStock(itemsInStock - augend);
    this.quantity = newQuantity;
  }

  @Synchronized
  public void decreaseQuantityBy(final int augend, final int itemsInStock) {
    if (augend < 1) {
      throw new IllegalArgumentException("You must remove at least one item");
    }
    /* In case quantity to delete is more than items in cart then delete only the quantity in cart */
    int finalAugend = Math.min(augend, quantity);
    int newQuantity = quantity - finalAugend;
    product.itemsInStock(itemsInStock + finalAugend);
    this.quantity = newQuantity;
  }

  public Price subTotal() {
    return product.price().multiply(quantity);
  }
}
