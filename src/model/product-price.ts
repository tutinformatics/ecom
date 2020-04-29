import {Model} from "./model";

export class ProductPrice extends Model {
  taxInPrice: string;
  termUomId?: any;
  priceWithTax?: number;
  createdStamp: any;
  // _ENTITY_NAME_: string;
  productStoreGroupId: string;
  taxAuthPartyId: string;
  lastModifiedByUserLogin: string;
  customPriceCalcService?: any;
  price: number;
  taxAuthGeoId: string;
  productPricePurposeId: string;
  createdByUserLogin: string;
  lastUpdatedStamp: any;
  productId: string;
  lastModifiedDate: any;
  createdTxStamp: any;
  taxPercentage?: number;
  lastUpdatedTxStamp: any;
  thruDate?: Date;
  fromDate: Date;
  currencyUomId: string;
  createdDate: Date;
  priceWithoutTax?: number;
  taxAmount?: number;
  productPriceTypeId: string;
}
