import AuditModel from "@/models/audit-model";

export default class Reservation extends AuditModel {
    constructor(id, createdAt, updatedAt, isDeleted, userId, officeId,
                bookingIntentId, startTime, endTime, reservationState) {
        super(id, createdAt, updatedAt, isDeleted, );
        this.userId = userId;
        this.officeId = officeId;
        this.bookingIntentId = bookingIntentId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reservationState = reservationState;
    }
}
