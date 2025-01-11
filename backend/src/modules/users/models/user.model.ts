import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Consultation } from "src/modules/consultations";
import { MedicalHistory } from "src/modules/medical_history";
import { Notification } from "src/modules/notifications";

export enum UserRoles {
    user = 'USER',
    admin = 'ADMIN',
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    fullname: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @Column({ type: DataType.BIGINT, allowNull: true })
    phone_number: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({
        type: DataType.ENUM,
        values: [UserRoles.admin, UserRoles.user],
        allowNull: false,
        defaultValue: UserRoles.user,
    })
    role ?: UserRoles;


    @HasMany(() => MedicalHistory)
    medical_histories: MedicalHistory[];

    @HasMany(() => Consultation)
    consultations: Consultation[];

    @HasMany(() => Notification)
    notifications: Notification[];

}