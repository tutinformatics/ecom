import {Model} from "./model";

export class ProductPrice extends Model {
  taxInPrice: string;
  termUomId?: any;
  priceWithTax?: number;
  createdStamp: Date;
  // _ENTITY_NAME_: string;
  productStoreGroupId: string;
  taxAuthPartyId: string;
  lastModifiedByUserLogin: string;
  customPriceCalcService?: Date;
  price: number;
  taxAuthGeoId: string;
  productPricePurposeId: string;
  createdByUserLogin: string;
  lastUpdatedStamp: Date;
  productId: string;
  lastModifiedDate: Date;
  createdTxStamp: Date;
  taxPercentage?: number;
  lastUpdatedTxStamp: Date;
  thruDate?: Date;
  fromDate: Date;
  currencyUomId: string;
  createdDate: Date;
  priceWithoutTax?: number;
  taxAmount?: number;
  productPriceTypeId: string;
}
