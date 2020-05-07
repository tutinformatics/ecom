import {Product} from "../model/product";

export class ProductUtils {
  static getPriceWithoutTaxString(product: Product): string {
    let price = 0;
    if (typeof product._toMany_ProductPrice !== "undefined") {
      price = product._toMany_ProductPrice[0].priceWithoutTax;
    }
    if (price === null) {
      price = 0;
    }
    return price + " $"
  }

  static getPriceWithTaxString(product: Product): string {
    let price = 0;
    if (typeof product._toMany_ProductPrice !== "undefined") {
      price = product._toMany_ProductPrice[0].priceWithTax;
    }
    if (price === null) {
      price = 0;
    }
    return price + " $"
  }

  static getCategoryInfo(product: Product): string {
    if (typeof product._toOne_PrimaryProductCategory !== "undefined") {
      return product._toOne_PrimaryProductCategory.categoryName
    }
    return "none"
  }
}
