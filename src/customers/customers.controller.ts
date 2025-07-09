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
	findAll(): Customer[] {
		return this.customersService.findAll()
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number): Customer {
		return this.customersService.findOne(id)
	}

	@Post()
	create(@Body() body: Omit<Customer, "id">): Customer {
		return this.customersService.create(body)
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() body: UpdateCustomerDto,
	): Customer {
		return this.customersService.update(id, body)
	}

	@Delete(":id")
	delete(@Param("id", ParseIntPipe) id: number): void {
		this.customersService.delete(id)
	}
}
