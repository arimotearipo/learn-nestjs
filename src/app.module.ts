import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CustomersModule } from "./customers/customers.module"
import { OrdersModule } from "./orders/orders.module"
import { ProductsModule } from "./products/products.module"

@Module({
	imports: [ProductsModule, CustomersModule, OrdersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
