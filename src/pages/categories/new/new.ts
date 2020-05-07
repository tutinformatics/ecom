import {inject} from 'aurelia-framework'
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductCategory} from "../../../model/product-category";

@inject(ProductCategoryService)
export class New {
  category = new ProductCategory();

  constructor(private productCategoryService: ProductCategoryService) {
  }

  createCategory() {
    this.productCategoryService.createProductCategory(this.category)
      .then(() => this.category = new ProductCategory());
  }
}
