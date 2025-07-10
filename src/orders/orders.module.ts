import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Customer } from "src/customers/entities/customers.entity"
import { Product } from "src/products/entities/products.entity"
import { Order } from "./entities/order.entity"
import { OrderItem } from "./entities/order-item.entity"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"

@Module({
	imports: [TypeOrmModule.forFeature([Order, Customer, Product, OrderItem])],
	controllers: [OrdersController],
	providers: [OrdersService],
})
export class OrdersModule {}
