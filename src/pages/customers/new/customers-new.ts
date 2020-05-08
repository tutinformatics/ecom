import {inject} from 'aurelia-framework';
import {PartyService} from "../../../service/party-service";
import {Party} from "../../../model/party";
import {Person} from "../../../model/person";
import {PersonService} from "../../../service/person-service";
import {ContactMech} from "../../../model/contact-mech";
import {ContactMechService} from "../../../service/contact-mech-service";

@inject(PartyService, PersonService, ContactMechService)
export class CustomersNew {
  party = new Party();
  person = new Person();
  emailContact = new ContactMech();
  phoneContact = new ContactMech();

  constructor(private partyService: PartyService,
              private personService: PersonService,
              private contactMechService: ContactMechService) {
  }

  createParty() {
    this.personService.createPerson(this.person)
      .then((res) => {
        this.person.partyId = res.partyId;

        this.emailContact.partyId = res.partyId;
        this.emailContact.contactMechTypeId = "EMAIL_ADDRESS"

        this.phoneContact.partyId = res.partyId;
        this.phoneContact.contactMechTypeId = "TELECOM_NUMBER";

        this.contactMechService.createPartyContactMech(this.emailContact)
          .then((resp) => console.log(resp));

        this.contactMechService.createPartyContactMech(this.phoneContact)
          .then((resp) => console.log(resp));
      });
  }

  private createRelatedEntities(party: Party) {
    this.person.partyId = party.partyId;
    this.personService.createPerson(this.person)
      .then((res) => console.log(res));

    // TODO CONTACT/ADDRESS - phone, email and address fields
  }
}
