import {Model} from "./model";

export class ProductKeyword extends Model {
  relevancyWeight?: number;
  lastUpdatedStamp: any;
  productId: string;
  statusId: string;
  keywordTypeId: string;
  createdTxStamp: any;
  createdStamp: any;
  // _ENTITY_NAME_: string;
  lastUpdatedTxStamp: any;
  keyword: string;
}
