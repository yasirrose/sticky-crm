export class Affiliate {
  date: Date;
  initials: number;
  decline: number;
  decline_per: number;
  scrub_per: number;
  EOT_declines: number;
  EOT_approved: number;
  EOT_per: number;


  constructor(ticket) {
    this.date = ticket.date;
    this.initials = ticket.initials;
    this.decline = ticket.decline;
    this.decline_per = ticket.decline_per;
    this.scrub_per = ticket.scrub_per;
    this.EOT_declines = ticket.EOT_declines;
    this.EOT_approved = ticket.EOT_approved;
    this.EOT_per = ticket.EOT_per;

  }
}
