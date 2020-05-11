import {inject} from 'aurelia-framework';
import {ProductService} from "../../../service/product-service";
import {Product} from "../../../model/product";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductTypeService} from "../../../service/product-type-service";
import {ProductType} from "../../../model/product-type";
import {ProductPrice} from "../../../model/product-price";
import {ProductPriceService} from "../../../service/product-price-service";

@inject(ProductService, ProductCategoryService, ProductTypeService, ProductPriceService)
export class New {
  product = new Product();
  productPrice = new ProductPrice();
  categories: ProductCategory[] = [];
  types: ProductType[] = [];

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService,
              private productTypeService: ProductTypeService,
              private productPriceService: ProductPriceService)
  {
    this.loadCategories();
    this.loadTypes();
  }

  createProduct() {
    this.product.internalName = this.product.productName;
    this.productService.createProduct(this.product)
      .then((product) => this.createRelatedEntities(product))
      .then(() => this.product = new Product());
  }

  private createRelatedEntities(product: Product) {
    this.productPrice.productId = product.productId;
    this.productPriceService.createProductPrice(this.productPrice)
      .then((res) => console.log(res));
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
