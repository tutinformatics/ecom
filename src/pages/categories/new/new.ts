import {inject} from 'aurelia-framework'
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryType} from "../../../model/product-category-type";
import {ProductCategoryTypeService} from "../../../service/product-category-type-service";

@inject(ProductCategoryService, ProductCategoryTypeService)
export class New {
  category = new ProductCategory();
  categories: ProductCategory[] = [];
  types: ProductCategoryType[] = [];

  constructor(private productCategoryService: ProductCategoryService,
              private productCategoryTypeService: ProductCategoryTypeService) {
    productCategoryService.getProductCategories()
      .then((categories) => this.categories = categories);
    productCategoryTypeService.getProductCategoryTypes()
      .then((types) => this.types = types);
  }

  createCategory() {
    this.productCategoryService.createProductCategory(this.category)
      .then(() => this.category = new ProductCategory());
  }
}
