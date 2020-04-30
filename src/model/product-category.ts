import {Model} from "./model";

export class ProductCategory extends Model {
  longDescription: string;
  lastUpdatedStamp: Date;
  productCategoryTypeId: string;
  detailScreen: string;
  createdTxStamp: Date;
  createdStamp: Date;
  // _ENTITY_NAME_: string;
  description: string;
  lastUpdatedTxStamp: Date;
  linkTwoImageUrl?: any;
  categoryName?: any;
  productCategoryId: string;
  linkOneImageUrl?: any;
  primaryParentCategoryId: string;
  categoryImageUrl?: any;
  showInSelect?: any;
}
