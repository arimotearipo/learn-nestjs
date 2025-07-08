import { Injectable, NotFoundException } from "@nestjs/common"
import type { Customer } from "./models/customers.model"

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

	create(data: Omit<Customer, "id">): Customer {
		const newCustomer: Customer = {
			...data,
			id: this.nextId++,
		}

		this.customers.push(newCustomer)

		return newCustomer
	}

	update(id: number, data: Partial<Omit<Customer, "id">>): Customer {
		const cust = this.customers.find((c) => c.id === id)

		if (!cust) {
			throw new NotFoundException("User not found")
		}

		Object.assign(cust, data)

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
