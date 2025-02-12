import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/users";
import { Doctor } from "src/modules/doctors";
import * as moment from "moment";

@Table({ tableName: "medical_histories", timestamps: true })
export class MedicalHistory extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @ForeignKey(() => User)
    user_id: number;

    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE" })
    @ForeignKey(() => Doctor)
    doctor_id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    treatment_details: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        get() {
            const time = this.getDataValue('schedule_time');
            return time ? moment(time).format('DD/MM/YYYY') : null;
        },
        set(value: string) {
            if (value) {
                const parsedDate = moment(value, 'DD/MM/YYYY', true);
                if (parsedDate.isValid()) {
                    this.setDataValue('schedule_time', parsedDate.toDate());
                } else {
                    throw new Error('Invalid date format. Please use DD/MM/YYYY');
                }
            }
        }
    })
    diagnosis_date: Date;

    @Column({ type: DataType.STRING, allowNull: false })
    condition_name: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Doctor)
    doctor: Doctor;
}
