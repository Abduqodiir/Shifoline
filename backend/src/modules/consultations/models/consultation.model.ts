import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Doctor } from "src/modules/doctors";
import { User } from "src/modules/users";

export enum PaymentStatus {
    complete = "complete",
    incomplete = "incomplete",
    processing = 'processing',
}

@Table({ tableName: "consultations", timestamps: true })
export class Consultation extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.DATE, allowNull: false })
    schedule_time: Date;

    @Column({ type: DataType.TEXT, allowNull: false })
    prescription: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    recommendations: string;

    @Column({ type: DataType.ENUM, values: [PaymentStatus.complete, PaymentStatus.incomplete, PaymentStatus.processing], defaultValue: PaymentStatus.incomplete })
    payment_status: PaymentStatus;

    @ForeignKey(() => Doctor)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    doctor_id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    user_id: number;

    @BelongsTo(() => Doctor)
    doctor: Doctor;

    @BelongsTo(() => User)
    user: User;
}
