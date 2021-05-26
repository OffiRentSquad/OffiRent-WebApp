import AuditModel from "@/models/audit-model";

export default class Country extends AuditModel{
    constructor(id, createdAt, updatedAt, isDeleted, name) {
        super(id, createdAt, updatedAt, isDeleted);
        this.name = name;
    }
}
