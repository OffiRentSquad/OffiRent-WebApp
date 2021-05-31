import AuditModel from "@/models/audit-model";

export default class User extends AuditModel{
    constructor(id, createdAt, updatedAt, isDeleted, isPremium, firstName, surname,
                fullName, email, password, phoneNumber, birthDay, joinDate, lastOnline) {
        super(id, createdAt, updatedAt, isDeleted);
        this.isPremium = isPremium;
        this.firstName = firstName;
        this.surname = surname;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDay = birthDay;
        this.joinDate = joinDate;
        this.lastOnline = lastOnline;
    }
}
