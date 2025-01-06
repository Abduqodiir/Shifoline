import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "doctors", timestamps: true})
export class Doctor extends Model {
    @Column({ type: DataType.TEXT, allowNull: false, unique: false })
    fullname: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    experience_years: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    speciality: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    consultation_price: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    languages: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    rating: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    image ?: string;
}