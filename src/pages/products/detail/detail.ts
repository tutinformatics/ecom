import {inject} from 'aurelia-framework';
import {ProductService} from "../../../service/product-service";
import {Product} from "../../../model/product";
import {ProductUtils} from "../../../util/product-utils";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductPriceService} from "../../../service/product-price-service";
import {ProductPrice} from "../../../model/product-price";
import {ProductType} from "../../../model/product-type";
import {ProductTypeService} from "../../../service/product-type-service";
import {ProductCategoryMemberService} from "../../../service/product-category-member-service";
import {ProductCategoryMember} from "../../../model/product-category-member";

//import $ from 'jquery'

@inject(ProductService, ProductCategoryService, ProductPriceService, ProductTypeService, ProductCategoryMemberService)
export class Detail {
  product?: Product = null;
  productPrice: ProductPrice = new ProductPrice();
  categories: ProductCategory[] = [];
  types: ProductType[] = [];
  isEditingMode: boolean = false;

  selectedSubCategories = [];
  categoryMappings = {
    option: 'categoryName',
    id: 'productCategoryId'
  }
  pickerOptions = {
    actionsBox: true,
    dropupAuto: true,
    liveSearch: true
  };

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService,
              private productPriceService: ProductPriceService,
              private productTypeService: ProductTypeService,
              private productCategoryMemberService: ProductCategoryMemberService) {
  }

  activate(params) {
    this.loadProduct(params.id);
    this.loadCategories();
    this.loadTypes();
  }

  updateData() {
    if (this.productPrice.productId !== undefined) {
      this.productPriceService.updateProductPrice(this.productPrice)
        .then((price) => console.log(price))
        .then(() => this.loadProduct(this.product.productId)); // Back doesn't have functionality
    } else {
      this.productPrice.productId = this.product.productId;
      this.productPriceService.createProductPrice(this.productPrice)
        .then((price) => console.log(price));
    }

    if (this.selectedSubCategories) {
      this.selectedSubCategories.forEach((cat) => {
        cat.productId = this.product.productId;
        this.productCategoryMemberService.addProductToCategory(cat)
          .then((res) => console.log(res));
      })
    }

    this.productService.updateProduct(this.product)
      .then((product) => console.log(product))
      .then(() => this.loadProduct(this.product.productId)); // Back doesn't have functionality
    this.isEditingMode = false
  }

  private loadTypes() {
    this.productTypeService.getAll()
      .then((types) => this.types = types);
  }

  private loadProduct(id: string) {
    this.productService.getSingle(id)
      .then((product) => this.product = product[0])
      .then(() => {
        if (this.product._toMany_ProductPrice !== undefined && this.product._toMany_ProductPrice[0] !== undefined) {
          this.productPrice.price = this.product._toMany_ProductPrice[0].price;
          this.productPrice.productId = this.product._toMany_ProductPrice[0].productId;
          this.productPrice.fromDate = this.product._toMany_ProductPrice[0].fromDate;
        }
      })
      .then(() => console.log(this.product))
      .then(() => {
        if (this.categories !== null) {
          this.categories.forEach((c) => {
            if (this.product._toMany_ProductCategoryMember
              .filter((pc) => pc.productCategoryId === c.productCategoryId).length > 0) {
              this.selectedSubCategories.push(c);
            }
          })
        }
      });
  }

  addProductToCategory(categoryId: string) {
    const categoryMember = new ProductCategoryMember();
    categoryMember.productId = this.product.productId;
    categoryMember.productCategoryId = categoryId;

    this.productCategoryMemberService.addProductToCategory(categoryMember)
      .then((res) => console.log(res));
  }

  removeProductFromCategory(categoryMember: ProductCategoryMember) {
    this.productCategoryMemberService.removeProductFromCategory(categoryMember)
      .then((res) => console.log(res));
  }

  private loadCategories() {
    this.productCategoryService.getProductCategories()
      .then((categories) => categories.filter((c) => c.categoryName && c.categoryName != ''))
      .then((categories) => this.categories = categories)
      .then(() => {
        if (this.product !== null) {
          this.categories.forEach((c) => {
            if (this.product._toMany_ProductCategoryMember
              .filter((pc) => pc.productCategoryId === c.productCategoryId).length > 0) {
              this.selectedSubCategories.push(c);
            }
          })
        }
      });
  }

  getCategoryInfo(product: Product): string {
    return ProductUtils.getCategoryInfo(product);
  }

  getPriceWithoutTaxString(product: Product): string {
    return ProductUtils.getPriceWithoutTaxString(product);
  }

  getPriceWithTaxString(product: Product): string {
    return ProductUtils.getPriceWithTaxString(product);
  }

}
