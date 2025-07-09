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
import { UpdateProductDto } from "./dto/update-product.dto"
import type { Product } from "./entities/products.entity"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	findAll(): Product[] {
		return this.productsService.findAll()
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number): Product {
		return this.productsService.findOne(id)
	}

	@Post()
	create(@Body() body: Omit<Product, "id">): Product {
		return this.productsService.create(body)
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() body: UpdateProductDto,
	): Product {
		return this.productsService.update(id, body)
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number): void {
		this.productsService.remove(id)
	}
}
