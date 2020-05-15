import {PartyService} from "../../../service/party-service";
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {ContactMechService} from "../../../service/contact-mech-service";
import {Party} from "../../../model/party";

@inject(Router, PartyService, ContactMechService)
export class CustomersList {
  parties: Party[] = [];
  filteredParties: Party[] = [];
  nameFilter: string = '';

  constructor(private router: Router,
              private partyService: PartyService,
              private contactMechService: ContactMechService) {
    this.initParties();
  }

  initParties() {
    this.partyService.getAll()
      .then(res => {
        res.map((party) => {
          if (party._toMany_PartyContactMech) {
            party._toMany_PartyContactMech.forEach((contact) => {
              // this.contactMechService.getById(contact.contactMechId)
              //   .then((contactJson) => {
                  if (contact._toOne_ContactMech.contactMechTypeId === "EMAIL_ADDRESS"){
                    party.__toOne_EmailAddress = contact._toOne_ContactMech // Cuz aurelia
                  }
              //  });
            });
          }
        });
        this.parties = res;
        this.filteredParties = res;
      });
  }

  onSearchFilterChanged() {
    this.filteredParties = this.parties.filter((p) => p.partyId.toLowerCase().startsWith(this.nameFilter.toLowerCase()));
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
