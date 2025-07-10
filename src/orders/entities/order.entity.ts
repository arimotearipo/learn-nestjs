import { Customer } from "src/customers/entities/customers.entity"
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm"
import { OrderItem } from "./order-item.entity"

@Entity()
export class Order {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Customer, { eager: true })
	@JoinColumn({ name: "customerId" })
	customer: Customer

	@OneToMany(
		() => OrderItem,
		(orderItem) => orderItem.order,
		{ cascade: true, eager: true },
	)
	orderItems: OrderItem[]

	@Column("decimal")
	totalAmount: number

	@Column()
	status: "pending" | "paid" | "shipped" | "cancelled"

	@Column()
	createdAt: Date

	@Column()
	updatedAt: Date
}
