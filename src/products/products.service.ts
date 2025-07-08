import { Injectable, NotFoundException } from "@nestjs/common"
import type { Product } from "./models/products.model"

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

	create(data: Omit<Product, "id">): Product {
		const product: Product = {
			...data,
			id: this.nextId++,
		}

		this.products.push(product)

		return product
	}

	update(id: number, data: Partial<Omit<Product, "id">>): Product {
		const product = this.products.find((p) => p.id === id)

		if (!product) {
			throw new NotFoundException("Product not found")
		}

		Object.assign(product, data)

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
