import {Model} from "./model";

export class ProductCategory extends Model {
  longDescription: string;
  lastUpdatedStamp: Date;
  productCategoryTypeId: string;
  detailScreen: string;
  createdTxStamp: Date;
  createdStamp: Date;
  description: string;
  lastUpdatedTxStamp: Date;
  linkTwoImageUrl?: any;
  categoryName?: string;
  productCategoryId: string;
  linkOneImageUrl?: any;
  primaryParentCategoryId: string;
  categoryImageUrl?: any;
  showInSelect?: any;
}
