import {Model} from "./model";

export class ProductKeyword extends Model {
  relevancyWeight?: number;
  lastUpdatedStamp: Date;
  productId: string;
  statusId: string;
  keywordTypeId: string;
  createdTxStamp: Date;
  createdStamp: Date;
  // _ENTITY_NAME_: string;
  lastUpdatedTxStamp: Date;
  keyword: string;
}
