import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { Product } from "./entities/products.entity"

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) {}

	async findAll(): Promise<Product[]> {
		return this.productRepository.find()
	}

	async findOne(id: number): Promise<Product> {
		const product = await this.productRepository.findOneBy({ id })

		if (!product) {
			throw new NotFoundException("Product not found")
		}

		return product
	}

	async create(createProductDto: CreateProductDto): Promise<Product> {
		const newProduct = this.productRepository.create(createProductDto)

		return this.productRepository.save(newProduct)
	}

	async update(
		id: number,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		const product = await this.findOne(id)

		if (!product) {
			throw new NotFoundException("Product not found")
		}

		Object.assign(product, updateProductDto)

		return this.productRepository.save(product)
	}

	async remove(id: number): Promise<void> {
		const result = await this.productRepository.delete(id)

		if (!result.affected) {
			throw new NotFoundException("Product not found")
		}
	}
}
