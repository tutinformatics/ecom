import {inject} from 'aurelia-framework'
import {Product} from "../../../model/product";
import {PartyService} from "../../../service/party-service";
import {Party} from "../../../model/party";
import {OrderRow} from "../../../model/order-row";
import {ProductService} from "../../../service/product-service";

@inject(ProductService, PartyService)
export class NewOrder {

  products: Product[] = [];
  parties: Party[] = [];
  rows = [new OrderRow()];

  constructor(private productService: ProductService, private partyService: PartyService) {
    this.initData()
  }

  attached() {
    this.initData();
  }

  initData() {
    this.productService.getAll()
      .then(result => this.products = result);
    this.partyService.getAll()
      .then(result => this.parties = result);
  }

  addRow(){
    this.rows.push(new OrderRow())
  }

  removeRow(event) {
    this.rows.splice(event.target.id, 1);
  }
}
