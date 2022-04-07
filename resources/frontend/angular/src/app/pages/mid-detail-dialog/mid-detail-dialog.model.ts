export class MidDetailModel {
    name: string;
    total_count: number;
    percentage: number;

    constructor(data) {
        this.name = data.name;
        this.total_count = data.total_count;
        this.percentage = data.percentage;
    }
}