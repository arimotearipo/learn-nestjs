import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common"
import { CustomersService } from "./customers.service"
import { UpdateCustomerDto } from "./dto/update-customer.dto"
import type { Customer } from "./entities/customers.entity"

@Controller("customers")
export class CustomersController {
	constructor(private readonly customersService: CustomersService) {}

	@Get()
	async findAll(): Promise<Customer[]> {
		return this.customersService.findAll()
	}

	@Get(":id")
	async findOne(@Param("id", ParseIntPipe) id: number): Promise<Customer> {
		return this.customersService.findOne(id)
	}

	@Post()
	async create(@Body() body: Omit<Customer, "id">): Promise<Customer> {
		return this.customersService.create(body)
	}

	@Patch(":id")
	async update(
		@Param("id", ParseIntPipe) id: number,
		@Body() body: UpdateCustomerDto,
	): Promise<Customer> {
		return this.customersService.update(id, body)
	}

	@Delete(":id")
	async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
		this.customersService.delete(id)
	}
}
