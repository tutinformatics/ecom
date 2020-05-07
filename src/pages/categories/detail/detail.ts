import {inject} from 'aurelia-framework'
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryTypeService} from "../../../service/product-category-type-service";
import {ProductCategoryType} from "../../../model/product-category-type";

@inject(ProductCategoryService, ProductCategoryTypeService)
export class Detail {
  category: ProductCategory;
  categories: ProductCategory[] = [];
  types: ProductCategoryType[] = [];
  isEditingMode: boolean = false;

  constructor(private productCategoryService: ProductCategoryService,
              private productCategoryTypeService: ProductCategoryTypeService) {
    productCategoryService.getProductCategories()
      .then((categories) => this.categories = categories);
    productCategoryTypeService.getProductCategoryTypes()
      .then((types) => this.types = types);
  }

  activate(params) {
    this.loadCategory(params.id);
  }

  updateData() {
    this.productCategoryService.updateProductCategory(this.category)
      .then((resp) => console.log(resp))
      .then(() => this.loadCategory(this.category.productCategoryId));
    this.isEditingMode = false
  }

  private loadCategory(id: string) {
    this.productCategoryService.getSingle(id)
      .then((category) => this.category = category[0]);
  }

}
