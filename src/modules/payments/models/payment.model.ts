import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Consultation } from "src/modules/consultations";

export enum PaymentMethod {
    CREDIT_CARD = "credit_card",
    CASH = "cash",
    ONLINE_TRANSFER = "online_transfer",
}

export enum PaymentStatus {
    COMPLETED = "completed",
    PENDING = "pending",
    FAILED = "failed",
}

@Table({ tableName: "payments", timestamps: true })
export class Payment extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Consultation)
    @Column({ type: DataType.BIGINT, allowNull: false , onDelete: "CASCADE", onUpdate: "CASCADE" })
    consultation_id: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    amount: number;

    @Column({ 
        type: DataType.ENUM, 
        values: [PaymentMethod.CREDIT_CARD, PaymentMethod.CASH, PaymentMethod.ONLINE_TRANSFER],
        allowNull: false 
    })
    payment_method: PaymentMethod;

    @Column({ 
        type: DataType.ENUM, 
        values: [PaymentStatus.COMPLETED, PaymentStatus.PENDING, PaymentStatus.FAILED],
        defaultValue: PaymentStatus.PENDING 
    })
    payment_status: PaymentStatus;

    @BelongsTo(() => Consultation)
    consultation: Consultation;
}
