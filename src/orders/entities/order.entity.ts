export class Order {
	id: number
	customerId: number
	productIds: number[]
	totalAmount: number
	status: "pending" | "paid" | "shipped" | "cancelled"
	createdAt: Date
	updatedAt: Date
}
