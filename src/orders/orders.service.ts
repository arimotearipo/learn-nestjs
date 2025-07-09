import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common"
import { CreateOrderDto } from "./dto/create-order.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { Order } from "./entities/order.entity"

@Injectable()
export class OrdersService {
	private orders: Order[] = []
	private nextId = 1

	// hardcoding product prices because we don't have DB
	private productPrices: Record<number, number> = {
		1: 10,
		2: 5.99,
		3: 2.5,
		4: 69.2,
		5: 10.23,
		6: 12.32,
	}

	create(createOrderDto: CreateOrderDto): Order {
		const totalAmount = this.calculateTotalAmount(createOrderDto.productIds)

		const newOrder: Order = {
			...createOrderDto,
			id: this.nextId++,
			createdAt: new Date(),
			updatedAt: new Date(),
			status: "pending",
			totalAmount,
		}

		this.orders.push(newOrder)

		return newOrder
	}

	findAll(): Order[] {
		return this.orders
	}

	findOne(id: number): Order {
		const order = this.orders.find((o) => o.id === id)

		if (!order) {
			throw new NotFoundException("Order not found")
		}

		return order
	}

	update(id: number, updateOrderDto: UpdateOrderDto) {
		const orderIndex = this.orders.findIndex((o) => o.id === id)

		if (orderIndex < 0) {
			throw new NotFoundException("Order not found")
		}

		const totalAmount = this.calculateTotalAmount(updateOrderDto.productIds)

		const updatedOrder: Order = {
			...this.orders[orderIndex],
			...updateOrderDto,
			updatedAt: new Date(),
			totalAmount,
		}

		this.orders[orderIndex] = updatedOrder

		return updatedOrder
	}

	remove(id: number) {
		const order = this.findOne(id)

		if (order) {
			this.orders.filter((o) => o.id !== id)
		}
	}

	calculateTotalAmount(productIds: number[]) {
		let totalAmount = 0
		for (const productId of productIds) {
			const price = this.productPrices[productId]

			if (price === undefined) {
				throw new BadRequestException(
					`Product with ID ${productId} does not have a price`,
				)
			}

			totalAmount += price
		}

		return totalAmount
	}
}
