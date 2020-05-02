import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category-service";

@inject(ProductsService, ProductCategoryService)
export class New {
  product = new Product();
  categories: ProductCategory[] = []

  constructor(private productService: ProductsService,
              private productCategoryService: ProductCategoryService)
  {
    this.loadCategories()
  }

  private loadCategories() {
    this.productCategoryService.getProductCategories()
      .then((categories) => this.categories = categories)
      .then(()=> console.log(this.categories));
  }
}
