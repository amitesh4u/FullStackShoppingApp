package com.amitesh.shop.adapter.in.rest.product;

import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.clientErrorException;
import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.parseProductId;

import com.amitesh.shop.adapter.in.rest.common.ClientErrorException;
import com.amitesh.shop.application.port.in.product.FindProductsUseCase;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.CustomLog;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@CustomLog
@ApiResponse(responseCode = "400", description = "Missing or Invalid Query or Product not found",
    content = @Content(mediaType = "application/json",
        schema = @Schema(implementation = ClientErrorException.class)))
@ApiResponse(responseCode = "500", description = "Internal server error. Please Try later", content = @Content)
@Tag(name = "Find Products Controller", description = "Endpoint for finding Products")
public class FindProductsController {

  private final FindProductsUseCase findProductsUseCase;

  public FindProductsController(FindProductsUseCase findProductsUseCase) {
    this.findProductsUseCase = findProductsUseCase;
  }

  @GetMapping
  @Operation(
      operationId = "FindProduct",
      summary = "Find Products by name or description",
      responses = @ApiResponse(responseCode = "200", description = "Matching Product list is returned",
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductInListWebModel.class))))
  public List<ProductInListWebModel> findProducts(
      @RequestParam(value = "query", required = false) String query) {
    if (query == null) {
      LOGGER.error("Search query is missing!!");
      throw clientErrorException(HttpStatus.BAD_REQUEST, "Missing search query");
    }

    List<Product> products;
    LOGGER.debug("Finding products matching search query " + query);
    try {
      products = findProductsUseCase.findByNameOrDescription(query);
    } catch (IllegalArgumentException e) {
      LOGGER.error("Invalid query format: " + query);
      throw clientErrorException(HttpStatus.BAD_REQUEST, "Invalid search query");
    }

    List<ProductInListWebModel> productsWebModel = products.stream()
        .map(ProductInListWebModel::fromDomainModel)
        .toList();
    LOGGER.debug("Returning products {} for query {}", productsWebModel, query);

    return productsWebModel;
  }

  @GetMapping("/all")
  @Operation(
      operationId = "FindAllProduct",
      summary = "Find All Products",
      responses = @ApiResponse(responseCode = "200", description = "All available Product list is returned",
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductInListWebModel.class))))
  public List<ProductInListWebModel> findAllProducts() {

    LOGGER.debug("Finding All Products!!");
    List<Product> products = findProductsUseCase.findAll();

    List<ProductInListWebModel> productsWebModel = products.stream()
        .map(ProductInListWebModel::fromDomainModel)
        .toList();
    LOGGER.debug("Returning all Products {}", productsWebModel);

    return productsWebModel;
  }

  @GetMapping("/{productId}")
  @Operation(
      operationId = "Find Product by Id",
      summary = "Find Product by Id",
      responses = @ApiResponse(responseCode = "200", description = "Available Product is returned",
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductInListWebModel.class))))
  public ProductInListWebModel findProductById(@PathVariable("productId") String productIdString) {

    LOGGER.debug("Finding Product by id " + productIdString);
    ProductId productId = parseProductId(productIdString);

    Product product = findProductsUseCase.findById(productId).orElse(null);
    if (null == product) {
      LOGGER.error("The requested product does not exist: " + productIdString);
      throw clientErrorException(
          HttpStatus.BAD_REQUEST, "The requested product does not exist");
    }
    ProductInListWebModel productsWebModel = ProductInListWebModel.fromDomainModel(product);
    LOGGER.debug("Returning Product {}", productsWebModel);

    return productsWebModel;
  }
}
