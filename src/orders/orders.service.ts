import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Customer } from "src/customers/entities/customers.entity"
import { Product } from "src/products/entities/products.entity"
import { In, Repository } from "typeorm"
import { CreateOrderDto } from "./dto/create-order.dto"
import { CreateOrderItemDto } from "./dto/create-order-item.dto"
import { UpdateOrderDto } from "./dto/update-order.dto"
import { Order } from "./entities/order.entity"

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) {}

	async create(createOrderDto: CreateOrderDto): Promise<Order> {
		const customer = await this.customerRepository.findOneBy({
			id: createOrderDto.customerId,
		})

		if (!customer) {
			throw new NotFoundException(
				`No customer with ID ${createOrderDto.customerId}`,
			)
		}

		const productIds = createOrderDto.orderItems.map((item) => item.productId)
		const products = await this.productRepository.findBy({ id: In(productIds) })
		const productMap = new Map(products.map((p) => [p.id, p]))

		const orderItems = createOrderDto.orderItems.map((item) => {
			const product = productMap.get(item.productId)

			if (!product) {
				throw new NotFoundException(
					`Product with ID ${item.productId} does not exist`,
				)
			}

			return {
				product,
				quantity: item.quantity,
			}
		})

		const totalAmount = await this.calculateTotalAmount(
			createOrderDto.orderItems,
		)

		const createdOrder = this.orderRepository.create({
			customer,
			orderItems,
			totalAmount,
			status: "pending",
			createdAt: new Date(),
			updatedAt: new Date(),
		})

		return this.orderRepository.save(createdOrder)
	}

	async findAll(): Promise<Order[]> {
		return this.orderRepository.find()
	}

	async findOne(id: number): Promise<Order> {
		const order = await this.orderRepository.findOneBy({ id })

		if (!order) {
			throw new NotFoundException("Order not found")
		}

		return order
	}

	async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
		const orderToUpdate = await this.orderRepository.findOneBy({ id })

		if (!orderToUpdate) {
			throw new NotFoundException("Order not found")
		}

		const totalAmount = await this.calculateTotalAmount(
			updateOrderDto.orderItems,
		)

		const updatedOrder = Object.assign(orderToUpdate, {
			...updateOrderDto,
			totalAmount,
		})

		return this.orderRepository.save(updatedOrder)
	}

	async remove(id: number) {
		return this.orderRepository.delete(id)
	}

	private async calculateTotalAmount(
		orderItems: CreateOrderItemDto[],
	): Promise<number> {
		const allOrderItemIds = orderItems.map((o) => o.productId)
		const products = await this.productRepository.findBy({
			id: In(allOrderItemIds),
		})

		// map of existing product IDs in our database based on productIds
		const productMap = new Map(products.map((p) => [p.id, p]))

		let totalAmount = 0
		for (const orderItem of orderItems) {
			const product = productMap.get(orderItem.productId)

			if (!product) {
				throw new NotFoundException(
					`Product with ID ${orderItem.productId} does not exist`,
				)
			}

			totalAmount += product.price * orderItem.quantity
		}

		return totalAmount
	}

	async findByCustomer(customerId: number): Promise<Order[]> {
		return this.orderRepository
			.createQueryBuilder("order")
			.leftJoinAndSelect("order.customer", "customer")
			.leftJoinAndSelect("order.orderItems", "orderItem")
			.leftJoinAndSelect("orderItem.product", "product")
			.where("customer.id = :customerId", { customerId })
			.getMany()
	}
}
