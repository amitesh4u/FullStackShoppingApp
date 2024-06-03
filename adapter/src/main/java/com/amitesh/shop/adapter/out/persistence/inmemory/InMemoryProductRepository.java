package com.amitesh.shop.adapter.out.persistence.inmemory;

import com.amitesh.shop.adapter.out.persistence.TestProducts;
import com.amitesh.shop.application.port.out.persistence.ProductRepository;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import lombok.CustomLog;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;

@ConditionalOnProperty(name = "persistence", havingValue = "inmemory", matchIfMissing = true)
@Repository
@CustomLog
public class InMemoryProductRepository implements ProductRepository {

  private final Map<ProductId, Product> products = new ConcurrentHashMap<>();

  public InMemoryProductRepository() {
    createDemoProducts();
  }

  private void createDemoProducts() {
    TestProducts.TEST_PRODUCTS.forEach(this::save);
  }

  @Override
  public Product save(Product product) {
    LOGGER.info("Product {} with Id {}", product, product.id());
    products.put(product.id(), product);
    return product;
  }

  @Override
  public void delete(Product product) {
    LOGGER.info("Product {} with Id {}", product, product.id());
    products.remove(product.id());
  }

  @Override
  public List<Product> findAll() {
    return products.values().stream().toList();
  }

  @Override
  public Optional<Product> findById(ProductId productId) {
    return Optional.ofNullable(products.get(productId));
  }

  @Override
  public List<Product> findByNameOrDescription(String query) {
    String queryLowerCase = query.toLowerCase(Locale.ROOT);
    return products.values().stream()
        .filter(product -> matchesQuery(product, queryLowerCase))
        .toList();
  }

  private boolean matchesQuery(Product product, String query) {
    return product.name().toLowerCase(Locale.ROOT).contains(query)
        || product.description().toLowerCase(Locale.ROOT).contains(query);
  }
}
