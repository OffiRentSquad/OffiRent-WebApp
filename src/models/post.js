import AuditModel from "@/models/audit-model";

export default class Post extends AuditModel {
    constructor(id, createdAt, updatedAt, isDeleted, officeId, userId,
                startDate, endDate, title, monthlyPrice, postState) {
        super(id, createdAt, updatedAt, isDeleted, );
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.title = title;
        this.monthlyPrice = monthlyPrice;
        this.postState = postState;
    }

}
