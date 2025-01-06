import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/modules/users";

@Table({ tableName: "reminders", timestamps: true })
export class Reminder extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false })
    patient_id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    message: string;

    @Column({ type: DataType.DATE, allowNull: false })
    remind_at: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    is_completed: boolean;

    @BelongsTo(() => User)
    patient: User;
}
