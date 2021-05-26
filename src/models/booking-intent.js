import AuditModel from "@/models/audit-model";

export default class BookingIntent extends AuditModel {
    constructor(id, createdAt, updatedAt, isDeleted, intentDate, postId,
                userId, reservationId, reservationProposedStartDate,
                reservationProposedEndDate, bookingIntentState) {
        super(id, createdAt, updatedAt, isDeleted);
        this.intentDate = intentDate;
        this.postId = postId;
        this.userId = userId;
        this.reservationId = reservationId;
        this.reservationProposedStartDate = reservationProposedStartDate;
        this.reservationProposedEndDate = reservationProposedEndDate;
        this.bookingIntentState = bookingIntentState;
    }
}
