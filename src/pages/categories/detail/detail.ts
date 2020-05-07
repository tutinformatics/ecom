import {inject} from 'aurelia-framework'
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductCategory} from "../../../model/product-category";

@inject(ProductCategoryService)
export class Detail {

  category: ProductCategory;

  constructor(private productCategoryService: ProductCategoryService) {

  }

  activate(params) {
    this.productCategoryService.getSingle(params.id)
      .then((category) => this.category = category[0]);
  }

}
