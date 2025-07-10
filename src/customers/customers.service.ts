import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateCustomerDto } from "./dto/create-customer.dto"
import { UpdateCustomerDto } from "./dto/update-customer.dto"
import { Customer } from "./entities/customers.entity"

@Injectable()
export class CustomersService {
	constructor(
		@InjectRepository(Customer)
		private readonly customerRepository: Repository<Customer>,
	) {}

	async findAll(): Promise<Customer[]> {
		return this.customerRepository.find()
	}

	async findOne(id: number): Promise<Customer> {
		const cust = await this.customerRepository.findOneBy({ id })

		if (!cust) {
			throw new NotFoundException("User not found")
		}

		return cust
	}

	async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
		const newCustomer = this.customerRepository.create(createCustomerDto)

		return this.customerRepository.save(newCustomer)
	}

	async update(
		id: number,
		updateCustomerDto: UpdateCustomerDto,
	): Promise<Customer> {
		const customerToUpdate = await this.findOne(id)

		Object.assign(customerToUpdate, updateCustomerDto)

		return this.customerRepository.save(customerToUpdate)
	}

	async delete(id: number): Promise<void> {
		const result = await this.customerRepository.delete(id)

		if (!result.affected) {
			throw new NotFoundException("No customer found")
		}
	}
}
