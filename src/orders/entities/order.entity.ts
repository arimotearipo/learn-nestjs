import { Customer } from "src/customers/entities/customers.entity"
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Customer, { eager: true })
	@JoinColumn({ name: "customerId" })
	customerId: Customer

	@Column("int")
	productIds: number[]
	totalAmount: number
	status: "pending" | "paid" | "shipped" | "cancelled"
	createdAt: Date
	updatedAt: Date
}
