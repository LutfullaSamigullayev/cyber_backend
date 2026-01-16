import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./module/auth/auth.module";
import { ProfileModule } from "./module/profile/profile.module";
import { AddressModule } from "./module/address/address.module";
import { CategoryModule } from "./module/category/category.module";
import { ProductModule } from "./module/product/product.module";
import { ShippingModule } from "./module/shipping/shipping.module";
import { HealthModule } from "./module/health/health.module";
import { FavoritesModule } from "./module/favorite/favorite.module";
import { CartModule } from "./module/cart/cart.module";
import { OrderModule } from "./module/order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      host: "localhost",
      port: 5432,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    AddressModule,
    
    CategoryModule,
    ShippingModule,
    ProductModule,
    FavoritesModule,
    CartModule,
    OrderModule,
    
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
