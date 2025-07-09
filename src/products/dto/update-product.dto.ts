import { IsNumber, IsPositive, IsString } from "class-validator"

export class UpdateProductDto {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsNumber()
	@IsPositive()
	price: number
}
