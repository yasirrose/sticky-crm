export class Prospect {

  id: string;
  // campaign_id: string;
  first_name: string;
  last_name: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  ip_address: string;
  month_created: string;
  year_created: string;
  date_created: string;
  risk_flag: string;
  affiliate: string;
  sub_affiliate: string;
  // note: string;

  constructor(prospect) {
    this.id = prospect.id;
    // this.campaign_id = prospect.campaign_id;
    this.first_name = prospect.first_name;
    this.last_name = prospect.last_name;
    this.address = prospect.address;
    this.address2 = prospect.address2;
    this.city = prospect.city;
    this.state = prospect.state;
    this.state = prospect.state;
    this.zip  = prospect.zip
    this.country = prospect.country;
    this.phone = prospect.phone;
    this.email = prospect.email;
    this.ip_address = prospect.ip_address;
    this.month_created = prospect.month_created;
    this.year_created = prospect.year_created;
    this.date_created = prospect.date_created;
    this.risk_flag = prospect.risk_flag;
    this.affiliate = prospect.affiliate;
    this.sub_affiliate = prospect.sub_affiliate;
    // this.note = prospect.note;
  }
}
