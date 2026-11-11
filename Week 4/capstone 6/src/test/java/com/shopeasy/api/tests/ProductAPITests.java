// REST Assured tests for the ShopEasy product API endpoints.
// Covers listing, searching, and getting products by ID with Hamcrest validation.
package com.shopeasy.api.tests;

import io.restassured.response.Response;
import org.testng.annotations.Test;
import com.shopeasy.api.client.ProductAPI;
import static org.hamcrest.Matchers.*;

public class ProductAPITests {

    @Test
    public void testGetAllProductsReturns200() {
        ProductAPI.getAllProducts()
            .then()
                .statusCode(200)
                .body("size()", equalTo(12))
                .body("[0].id", notNullValue())
                .body("[0].name", notNullValue())
                .body("[0].price", greaterThan(0));
    }

    @Test
    public void testSearchProductsByName() {
        ProductAPI.searchProducts("Running Shoes")
            .then()
                .statusCode(200)
                .body("size()", greaterThan(0))
                .body("[0].name", containsStringIgnoringCase("Running Shoes"));
    }

    @Test
    public void testGetProductByValidId() {
        Response allProducts = ProductAPI.getAllProducts();
        String firstId = allProducts.jsonPath().getString("[0].id");
        ProductAPI.getProductById(firstId)
            .then()
                .statusCode(200)
                .body("id", equalTo(firstId))
                .body("name", notNullValue())
                .body("price", greaterThan(0));
    }
}
