import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductCategory} from "../../../model/product-category";
import {Product} from "../../../model/product";

@inject (Router, ProductCategoryService)
export class List {

  categories: ProductCategory[] = [];

  constructor(private router: Router,
              private productCategoryService: ProductCategoryService) {
    this.loadCategories();
  }

  goToProducts() {
    this.router.navigateToRoute('products')
  }

  private loadCategories() {
    this.productCategoryService.getProductCategories()
      .then((categories) => this.categories = categories)
      .then(()=> console.log(this.categories));
  }

  onClickCategory(category: ProductCategory) {
    this.router.navigateToRoute('detail', {id: category.productCategoryId})
  }
}
