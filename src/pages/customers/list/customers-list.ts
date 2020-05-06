import {PartyService} from "../../../service/party-service";
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {Party} from "../../../model/party";
//import {TimeUtils} from "../../../util/time-utils";

@inject (Router, PartyService)
export class CustomersList {
  parties = [];

  constructor(private router: Router, private partyService: PartyService) {
    this.initParties();
  }

  initParties() {
    this.partyService.getAll()
      .then(res => this.parties = res);
  }

  //convertTime(ms: number) {
  //  return TimeUtils.convertDate(ms);
  //}

  onClickCustomer(event) {
    this.router.navigateToRoute('customers-detail', {id: this.parties[0].partyId})
  }

}
