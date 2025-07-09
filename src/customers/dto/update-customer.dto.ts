import { IsEmail, IsString } from "class-validator"

export class UpdateCustomerDto {
	@IsString()
	name: string

	@IsEmail()
	email: string
}
