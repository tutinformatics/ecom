import {Service} from "./service";
import {Party} from "../model/party";
import {Model} from "../model/model";
import {Person} from "../model/person";
import {CountryCode} from "../model/country-code";

export class CountryCodeService extends Service<CountryCode> {
  getAll(): Promise<CountryCode[]> {
    return this.get<CountryCode[]>("/entities/CountryCode",
      (data) => Model.arrayFromJson(data as Object[], CountryCode)
    );
  }
}
