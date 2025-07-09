import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateCustomerDto } from "./dto/create-customer.dto"
import { UpdateCustomerDto } from "./dto/update-customer.dto"
import type { Customer } from "./entities/customers.entity"

@Injectable()
export class CustomersService {
	private customers: Customer[] = []
	private nextId = 1

	findAll(): Customer[] {
		return this.customers
	}

	findOne(id: number) {
		const cust = this.customers.find((c) => c.id === id)

		if (!cust) {
			throw new NotFoundException("User not found")
		}

		return cust
	}

	create(createCustomerDto: CreateCustomerDto): Customer {
		const newCustomer: Customer = {
			...createCustomerDto,
			id: this.nextId++,
		}

		this.customers.push(newCustomer)

		return newCustomer
	}

	update(id: number, updateCustomerDto: UpdateCustomerDto): Customer {
		const cust = this.customers.find((c) => c.id === id)

		if (!cust) {
			throw new NotFoundException("User not found")
		}

		Object.assign(cust, updateCustomerDto)

		return cust
	}

	delete(id: number): void {
		const customerToDelete = this.customers.find((c) => c.id === id)

		if (!customerToDelete) {
			throw new NotFoundException("Customer not found")
		}

		const updatedCustomers = this.customers.filter((c) => c.id !== id)

		this.customers = updatedCustomers
	}
}
