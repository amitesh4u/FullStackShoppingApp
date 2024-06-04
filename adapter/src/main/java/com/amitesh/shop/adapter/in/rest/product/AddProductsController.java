package com.amitesh.shop.adapter.in.rest.product;

import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.clientErrorException;
import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.isValidProduct;
import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.parseProductId;

import com.amitesh.shop.adapter.in.rest.common.ClientErrorException;
import com.amitesh.shop.application.port.in.product.AddProductsUseCase;
import com.amitesh.shop.application.port.in.product.GenerateProductIdUseCase;
import com.amitesh.shop.model.price.Price;
import com.amitesh.shop.model.product.Product;
import com.amitesh.shop.model.product.ProductId;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.math.BigDecimal;
import java.util.Currency;
import lombok.CustomLog;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@CustomLog
@ApiResponse(responseCode = "400", description = "Missing or Invalid Details",
    content = @Content(mediaType = "application/json",
        schema = @Schema(implementation = ClientErrorException.class)))
@ApiResponse(responseCode = "500", description = "Internal server error. Please Try later", content = @Content)
@Tag(name = "Add Products Controller", description = "Endpoint for Adding Products")
public class AddProductsController {

  private final AddProductsUseCase addProductsUseCase;

  private final GenerateProductIdUseCase generateProductIdUseCase;

  public AddProductsController(AddProductsUseCase addProductsUseCase,
      GenerateProductIdUseCase generateProductIdUseCase) {
    this.addProductsUseCase = addProductsUseCase;
    this.generateProductIdUseCase = generateProductIdUseCase;
  }

  @PostMapping
  @Operation(
      operationId = "AddProduct",
      summary = "Add Product",
      responses = @ApiResponse(responseCode = "200", description = "Added Product is returned",
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductInListWebModel.class))))
  public ProductInListWebModel addProduct(
      @RequestParam(value = "name") String name,
      @RequestParam(value = "desc") String description,
      @RequestParam(value = "qty") String itemsInStock,
      @RequestParam(value = "amount") String amount,
      @RequestParam(value = "currency") String currency
  ) {
    if (!isValidProduct(name, description, itemsInStock, amount, currency)) {
      LOGGER.error("Product details are missing or invalid!!");
      throw clientErrorException(HttpStatus.BAD_REQUEST, "Invalid/Missing details");
    }

    Product product = new Product(new ProductId(generateProductIdUseCase.generateProductId()),
        name, description,
        new Price(Currency.getInstance(currency), new BigDecimal(amount)),
        Integer.parseInt(itemsInStock));
    LOGGER.debug("Adding product" + product);
    product = addProductsUseCase.save(product);

    ProductInListWebModel productsWebModel = ProductInListWebModel.fromDomainModel(product);
    LOGGER.debug("Returning product {}", productsWebModel);

    return productsWebModel;
  }

  @PostMapping("/{productId}")
  @Operation(
      operationId = "UpdateProduct",
      summary = "Update Product",
      responses = @ApiResponse(responseCode = "200", description = "Added Product is returned",
          content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductInListWebModel.class))))
  public ProductInListWebModel addProduct(
      @PathVariable(value = "productId") String productIdString,
      @RequestParam(value = "name") String name,
      @RequestParam(value = "desc") String description,
      @RequestParam(value = "qty") String itemsInStock,
      @RequestParam(value = "amount") String amount,
      @RequestParam(value = "currency") String currency
  ) {

    ProductId productId = parseProductId(productIdString);

    if (!isValidProduct(name, description, itemsInStock, amount, currency)) {
      LOGGER.error("Product details are missing or invalid!!");
      throw clientErrorException(HttpStatus.BAD_REQUEST, "Invalid/Missing details");
    }

    Product product = new Product(productId,
        name, description,
        new Price(Currency.getInstance(currency), new BigDecimal(amount)),
        Integer.parseInt(itemsInStock));
    LOGGER.debug("Updating product" + product);
    product = addProductsUseCase.save(product);

    ProductInListWebModel productsWebModel = ProductInListWebModel.fromDomainModel(product);
    LOGGER.debug("Returning product {}", productsWebModel);

    return productsWebModel;
  }
}
