import { Product } from "src/products/entities/products.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"

@Entity()
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(
		() => Order,
		(order) => order.orderItems,
		{ onDelete: "CASCADE" },
	)
	order: Order

	@ManyToOne(() => Product, { eager: true })
	product: Product

	@Column("int")
	quantity: number
}
