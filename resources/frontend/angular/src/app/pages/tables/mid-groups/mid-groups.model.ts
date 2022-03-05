export class MidGroup {
    // id: number;
    group_name: string;
    group_alias: string;
    assigned_mids: string;
    status: string;
    updated_at: string;
   
    constructor(midGroup) {
        // this.id = midGroup.id;
        this.group_name = midGroup.group_name;
        this.group_alias = '-';
        this.assigned_mids = midGroup.assigned_mids;
        this.status = midGroup.status;
        this.updated_at = '-';
    }
}