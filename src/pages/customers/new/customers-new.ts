import {inject} from 'aurelia-framework';
import {PartyService} from "../../../service/party-service";
import {Party} from "../../../model/party";
import {OnePerson} from "../../../model/one-person";
import {OnePersonService} from "../../../service/one-person-service";

@inject(PartyService, OnePersonService)
export class CustomersNew {
  party = new Party();
  onePerson = new OnePerson()
  constructor(private partyService: PartyService, private onePersonService: OnePersonService) {
  }

  createProduct() {
    this.partyService.createParty(this.party)
      //.then((product) => this.createRelatedEntities(product))
      .then(() => this.party = new Party());
  }

  private createRelatedEntities(party: Party) {
    this.onePerson.partyId = party.partyId;
    this.onePersonService.createOnePerson(this.onePerson)
      .then((res) => console.log(res));

    // TODO CONTACT/ADDRESS - phone, email and address fields
  }
}
