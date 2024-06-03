package com.amitesh.shop.adapter.in.rest.product;

import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.clientErrorException;
import static com.amitesh.shop.adapter.in.rest.common.ControllerHelper.parseProductId;

import com.amitesh.shop.adapter.in.rest.common.ClientErrorException;
import com.amitesh.shop.application.port.in.cart.ItemInCartException;
import com.amitesh.shop.application.port.in.cart.ProductNotFoundException;
import com.amitesh.shop.application.port.in.product.RemoveProductsUseCase;
import com.amitesh.shop.model.product.ProductId;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.CustomLog;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/products")
@CustomLog
@ApiResponse(responseCode = "400", description = "Missing or Invalid Product Id or The requested product does not exist or The requested product is present in a Cart",
    content = @Content(mediaType = "application/json",
        schema = @Schema(implementation = ClientErrorException.class)))
@ApiResponse(responseCode = "500", description = "Internal server error. Please Try later", content = @Content)
@Tag(name = "Remove Products Controller", description = "Endpoint for Removing Products")
public class RemoveProductsController {

  private final RemoveProductsUseCase removeProductsUseCase;

  public RemoveProductsController(RemoveProductsUseCase removeProductsUseCase) {
    this.removeProductsUseCase = removeProductsUseCase;
  }

  @DeleteMapping
  @Operation(
      operationId = "RemoveProduct",
      summary = "Remove Product",
      responses = @ApiResponse(responseCode = "200", description = "OK"))
  public void removeProduct(
      @RequestParam(value = "productId") String productIdString) {
    ProductId productId = parseProductId(productIdString);
    LOGGER.debug("Removing product" + productId);
    try {
      removeProductsUseCase.delete(productId);
    } catch (ProductNotFoundException e) {
      LOGGER.error("The requested product does not exist: " + productIdString);
      throw clientErrorException(
          HttpStatus.BAD_REQUEST, "The requested product does not exist");
    } catch (ItemInCartException e) {
      LOGGER.error("The requested product is present in a cart: " + productIdString);
      throw clientErrorException(
          HttpStatus.BAD_REQUEST, "The requested product is present in a Cart");
    }

  }
}
