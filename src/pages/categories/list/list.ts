import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductCategory} from "../../../model/product-category";

@inject (Router, ProductCategoryService)
export class List {

  categories: ProductCategory[] = [];
  sortAsc = true;

  constructor(private router: Router,
              private productCategoryService: ProductCategoryService) {
    this.loadCategories();
  }

  public sortBy(prop) {
    this.sortAsc = !this.sortAsc;
    this.categories = this.categories.sort((a, b) => {
      if (a[prop] > b[prop]) return this.sortAsc ? 1 : -1;
      if (a[prop] < b[prop]) return this.sortAsc ? -1 : 1;
      return 0;
    });
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