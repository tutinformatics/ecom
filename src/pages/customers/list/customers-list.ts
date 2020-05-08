import {PartyService} from "../../../service/party-service";
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {ContactMechService} from "../../../service/contact-mech-service";

@inject(Router, PartyService, ContactMechService)
export class CustomersList {
  parties = [];

  constructor(private router: Router,
              private partyService: PartyService,
              private contactMechService: ContactMechService) {
    this.initParties();
  }

  initParties() {
    this.partyService.getAllPersons()
      .then(res => {
        res.map((party) => {
          if (party._toMany_PartyContactMech) {
            party._toMany_PartyContactMech.forEach((contact) => {
              this.contactMechService.getById(contact.contactMechId)
                .then((contactJson) => contact._toOne_ContactMech = contactJson[0]);
            });
          }
        });
        this.parties = res;
      });
  }

  //convertTime(ms: number) {
  //  return TimeUtils.convertDate(ms);
  //}

  onClickCustomer(party) {
    this.router.navigateToRoute('customers-detail', {id: party.partyId})
  }

  goToNewCustomer() {
    this.router.navigateToRoute('customers-new')
  }

}
