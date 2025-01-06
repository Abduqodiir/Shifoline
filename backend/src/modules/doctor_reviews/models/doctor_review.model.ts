import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Doctor } from "src/modules/doctors";
import { User } from "src/modules/users";

@Table({ tableName: "doctor_reviews", timestamps: true })
export class DoctorReview extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Doctor)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    doctor_id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    patient_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 5 } })
    rating: number;

    @Column({ type: DataType.TEXT, allowNull: true })
    review_text: string;

    @BelongsTo(() => Doctor)
    doctor: Doctor;

    @BelongsTo(() => User)
    patient: User;
}
