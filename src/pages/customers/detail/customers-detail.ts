import {Party} from "../../../model/party";
import {PartyService} from "../../../service/party-service";
import {inject} from 'aurelia-framework';

@inject (PartyService)
export class CustomersDetail {

  party?: Party = null;

  constructor(private partyService: PartyService) {
  }

  activate(params) {
    this.loadParty(params.id)
  }

  private loadParty(id: string) {
    console.log(id)
    this.partyService.getSingle(id)
      .then((product) => this.party = product[0])
      //.then(() => {
      //  if (this.product._toMany_ProductPrice !== undefined && this.product._toMany_ProductPrice[0] !== undefined) {
      //    this.productPrice.price = this.product._toMany_ProductPrice[0].price;
      //    this.productPrice.productId = this.product._toMany_ProductPrice[0].productId;
      //    this.productPrice.fromDate = this.product._toMany_ProductPrice[0].fromDate;
      //  }
      //})
      .then(() => console.log(this.party));
  }


}
