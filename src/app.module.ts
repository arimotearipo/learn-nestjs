import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CustomersModule } from "./customers/customers.module"
import { OrdersModule } from "./orders/orders.module"
import { ProductsModule } from "./products/products.module"

@Module({
	imports: [
		ProductsModule,
		CustomersModule,
		OrdersModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "postgres",
			port: 5432,
			username: "postgres",
			password: "1234",
			database: "postgres",
			autoLoadEntities: true,
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
