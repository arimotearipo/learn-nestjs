import { PartialType } from "@nestjs/mapped-types"
import { IsArray, IsEnum, IsNumber } from "class-validator"
import { CreateOrderDto } from "./create-order.dto"

const status = ["pending", "paid", "shipped", "cancelled"] as const

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
	@IsNumber()
	customerId: number

	@IsArray()
	productIds: number[]

	@IsEnum(status)
	status: (typeof status)[number]
}
