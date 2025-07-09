import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import type { Product } from "./entities/products.entity"

@Injectable()
export class ProductsService {
	private products: Product[] = []
	private nextId = 1

	findAll(): Product[] {
		return this.products
	}

	findOne(id: number): Product {
		const product = this.products.find((p) => p.id === id)

		if (!product) {
			throw new NotFoundException("Product not found")
		}

		return product
	}

	create(createProductDto: CreateProductDto): Product {
		const product: Product = {
			...createProductDto,
			id: this.nextId++,
		}

		this.products.push(product)

		return product
	}

	update(id: number, updateProductDto: UpdateProductDto): Product {
		const product = this.products.find((p) => p.id === id)

		if (!product) {
			throw new NotFoundException("Product not found")
		}

		Object.assign(product, updateProductDto)

		return product
	}

	remove(id: number): void {
		const productToRemove = this.products.find((p) => p.id === id)

		if (!productToRemove) {
			throw new NotFoundException("Product not found")
		}

		const updatedProducts = this.products.filter((p) => p.id !== id)

		this.products = updatedProducts
	}
}
