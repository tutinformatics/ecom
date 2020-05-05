import {Model} from "./model";

export class OrderProductAndParty extends Model{
  unitPrice: number;
  quantity: number;
  productId: string;
  orderId: string;
  grandTotal: number;
  _ENTITY_NAME_: string;
  orderTypeId: string;
  orderStatus: string;
  originFacilityId?: any;
  groupName: string;
  visitId: string;
  currencyUom: string;
  itemStatus: string;
  paymentMethod: string;
  itemDescription: string;
  _DELEGATOR_NAME_: string;
  orderDate: number;
  webSiteId: string;
}
