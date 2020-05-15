import {inject} from 'aurelia-framework'
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {PartyService} from "../../../service/party-service";
import {Party} from "../../../model/party";
import {OrderRow} from "../../../model/order-row";

@inject(ProductsService, PartyService)
export class NewOrder {

  products: Product[] = [];
  party: Party[] = [];
  rows = [new OrderRow()];

  constructor(private productService: ProductsService, private partyService: PartyService) {

  }

  initData() {
    this.productService.getAll()
      .then(result => this.products = result);
    this.partyService.getAll()
      .then(result => this.party = result);
  }

  addRow(){
    this.rows.push(new OrderRow())
  }

  removeRow(event) {
    this.rows.splice(event.target.id, 1);
  }
}
