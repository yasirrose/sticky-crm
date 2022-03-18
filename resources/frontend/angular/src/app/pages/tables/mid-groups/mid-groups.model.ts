export class MidGroup {
    id: string;
    group_name: string;
    group_alias: string;
    assigned_mids: string;
    mids_data: string;
    gross_revenue: string;
    bank_per: string;
    target_bank_balance: string;
    updated_at: string;

    constructor(midGroup) {
        this.id = midGroup.id;
        this.group_name = midGroup.group_name;
        this.group_alias = midGroup.group_alias;
        this.assigned_mids = midGroup.assigned_mids;
        this.mids_data = midGroup.mids_data;
        this.gross_revenue = '$ ' + this.numberWithCommas(midGroup.gross_revenue);
        this.bank_per = midGroup.bank_per + ' %';
        this.target_bank_balance = '$ ' + this.numberWithCommas(midGroup.target_bank_balance);
        this.updated_at = '-';
    }
    numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}