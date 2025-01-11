import * as moment from "moment";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/modules/users";

@Table({ tableName: "reminders", timestamps: true })
export class Reminder extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "CASCADE"  })
    user_id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    message: string;

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
    remind_at: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    is_completed: boolean;

    @BelongsTo(() => User)
    user: User;
}
