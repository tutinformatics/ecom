import {Party} from "../../../model/party";
import {PartyService} from "../../../service/party-service";
import {inject} from 'aurelia-framework';
import {ContactMechService} from "../../../service/contact-mech-service";
import {PostalAddressService} from "../../../service/postal-address-service";
import {ContactMech} from "../../../model/contact-mech";
import {PostalAddress} from "../../../model/postal-address";

@inject (PartyService, ContactMechService, PostalAddressService)
export class CustomersDetail {

  emailContact? = new ContactMech();
  phoneContact? = new ContactMech();
  postalAddress? = new PostalAddress();
  party?: Party = null;
  isEditingMode: boolean = false

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
            // this.contactMechService.getById(contact.contactMechId)
            //   .then((contactJson) => {
                if (contact._toOne_ContactMech.contactMechTypeId === "EMAIL_ADDRESS") {
                  this.emailContact = contact._toOne_ContactMech;
                } else if (contact._toOne_ContactMech.contactMechTypeId === "TELECOM_NUMBER") {
                  this.phoneContact = contact._toOne_ContactMech;
                } else if (contact._toOne_ContactMech.contactMechTypeId === "POSTAL_ADDRESS") {
                  this.postalAddressService.getByContactMechId(contact.contactMechId)
                    .then((address) => this.postalAddress = address[0]);
                }
            //   });
          });
        }
        this.party = party[0];
      })
      .then(() => console.log(this.party));
  }

  updateData() {
    this.isEditingMode = false
  }
}
