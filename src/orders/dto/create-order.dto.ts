import { Type } from "class-transformer"
import { IsArray, IsNumber, IsPositive, ValidateNested } from "class-validator"
import { CreateOrderItemDto } from "./create-order-item.dto"

export class CreateOrderDto {
	@IsNumber()
	@IsPositive()
	customerId: number

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderItemDto)
	orderItems: CreateOrderItemDto[]
}
