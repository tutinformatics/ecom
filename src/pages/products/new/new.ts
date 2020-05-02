import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductTypeService} from "../../../service/product-type-service";
import {ProductType} from "../../../model/product-type";

@inject(ProductsService, ProductCategoryService, ProductTypeService)
export class New {
  product = new Product();
  categories: ProductCategory[] = [];
  types: ProductType[] = [];

  constructor(private productService: ProductsService,
              private productCategoryService: ProductCategoryService,
              private productTypeService: ProductTypeService)
  {
    this.loadCategories();
    this.loadTypes();
  }

  createProduct() {
    this.product.internalName = this.product.productName;
    this.productService.createProduct(this.product)
      .then((product) => console.log(product))
      .then(() => this.product = new Product());
  }

  private loadCategories() {
    this.productCategoryService.getProductCategories()
      .then((categories) => this.categories = categories)
      .then(()=> console.log(this.categories));
  }
  private loadTypes() {
    this.productTypeService.getAll()
      .then((types) => this.types = types);
  }
}
