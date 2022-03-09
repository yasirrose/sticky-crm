export class MidGroup {
    group_name: string;
    group_alias: string;
    assigned_mids: string;
    mids_data: string;
    updated_at: string;

    constructor(midGroup) {
        this.group_name = midGroup.group_name;
        this.group_alias = midGroup.group_alias;
        this.assigned_mids = midGroup.assigned_mids;
        this.mids_data = midGroup.mids_data;
        this.updated_at = '-';
    }
}