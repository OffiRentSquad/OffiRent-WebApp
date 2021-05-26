import AuditModel from "@/models/audit-model";

export default class Office extends AuditModel {
    constructor(id, createdAt, updatedAt, isDeleted, userId, districtId,
                latitude, longitude, name, description, busy) {
        super(id, createdAt, updatedAt, isDeleted, );
        this.userId = userId;
        this.districtId = districtId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.description = description;
        this.busy = busy;
    }

}
