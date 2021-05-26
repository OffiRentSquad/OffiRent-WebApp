import AuditModel from "@/models/audit-model";

export default class District extends AuditModel{
    constructor(id, createdAt, updatedAt, isDeleted, name, countryId) {
        super(id, createdAt, updatedAt, isDeleted);
        this.name = name;
        this.countryId = countryId;
    }
}
