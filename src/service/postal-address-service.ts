import {Model} from "../model/model";
import {Service} from "./service";
import {ContactMech} from "../model/contact-mech";
import {PostalAddress} from "../model/postal-address";

export class PostalAddressService extends Service<PostalAddress> {

  getAll(): Promise<PostalAddress[]> {
    return this.get<PostalAddress[]>("/entities/PostalAddress",
      (data) => Model.arrayFromJson(data as Object[], PostalAddress));
  }

  getByContactMechId(id: string): Promise<PostalAddress[]> {
    return this.get<PostalAddress[]>("/entities/PostalAddress",
      (data) => Model.arrayFromJson(data as Object[], PostalAddress),
      {contactMechId: id}
    );
  }

  createPartyPostalAddress(postalAddress: PostalAddress): Promise<PostalAddress> {
    return this.post("/services/createPartyPostalAddress",
      postalAddress,
      (data) => Model.fromJson(data as Object, PostalAddress)
    );
  }

  /*updateContactMech(contactMech: ContactMech): Promise<ContactMech> {
    return this.post("/services/updateContactMech",
      contactMech,
      (data) => Model.fromJson(data as Object, ContactMech))
  }*/
}
