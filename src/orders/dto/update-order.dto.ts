import { PartialType } from "@nestjs/mapped-types"
import { Type } from "class-transformer"
import { IsArray, IsNumber, ValidateNested } from "class-validator"
import { CreateOrderDto } from "./create-order.dto"
import { CreateOrderItemDto } from "./create-order-item.dto"

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
	@IsNumber()
	customerId: number

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderItemDto)
	orderItems: CreateOrderItemDto[]
}
