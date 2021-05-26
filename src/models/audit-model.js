export default class AuditModel {
    constructor(id, createdAt, updatedAt, isDeleted) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted;
    }
}
