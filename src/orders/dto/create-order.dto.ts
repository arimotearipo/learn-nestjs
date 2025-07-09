import { IsArray, IsNotEmpty, IsNumber, IsPositive } from "class-validator"

export class CreateOrderDto {
	@IsNumber()
	@IsPositive()
	customerId: number

	@IsArray()
	@IsNumber({}, { each: true })
	@IsNotEmpty({ each: true })
	productIds: number[]
}
