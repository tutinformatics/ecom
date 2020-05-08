import {Party} from "../../../model/party";
import {PartyService} from "../../../service/party-service";
import {inject} from 'aurelia-framework';
import {ContactMechService} from "../../../service/contact-mech-service";
import {PostalAddressService} from "../../../service/postal-address-service";

@inject (PartyService, ContactMechService, PostalAddressService)
export class CustomersDetail {

  party?: Party = null;

  constructor(private partyService: PartyService,
              private contactMechService: ContactMechService,
              private postalAddressService: PostalAddressService) {
  }

  activate(params) {
    this.loadParty(params.id)
  }

  private loadParty(id: string) {
    console.log(id)
    this.partyService.getSingle(id)
      .then((party) => {
        if (party[0]._toMany_PartyContactMech) {
          party[0]._toMany_PartyContactMech.forEach((contact) => {
            this.contactMechService.getById(contact.contactMechId)
              .then((contactJson) => contact._toOne_ContactMech = contactJson[0]);
            this.postalAddressService.getByContactMechId(contact.contactMechId)
              .then((address) => contact._toOne_PostalAddress = address[0]);
          });
        }
        this.party = party[0];
      })
      .then(() => console.log(this.party));
  }
}
