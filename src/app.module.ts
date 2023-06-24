import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/config/configuration';
import { PickupPlanModule } from './features/pickup-plan/pickup-plan.module';
import { SubscriptionModule } from './features/subscription/subscription.module';
import { PickupModule } from './features/pickup/pickup.module';
import { PaymentModule } from './features/payment/payment.module';
import { ProductModule } from './features/product-type/product.module';
import { CartModule } from './features/cart/cart.module';
import { WalletModule } from './features/wallet/wallet.module';
import { OrderModule } from './features/order/order.module';
import { CategoryModule } from './features/category/category.module';
import { NotificationModule } from './features/notification/notification.module';
import { LocationhandlerController } from './features/locationhandler/locationhandler.controller';
import { locationhandlerModule } from './features/locationhandler/locationhandler.module';

@Module({
  imports: [   

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env.staging', '.env.production','.env', '.env.mail']
    }),
    AuthModule,
    CategoryModule,
    PickupPlanModule,
    SubscriptionModule,
    PickupModule,
    PaymentModule,
    ProductModule,
    CartModule,
    WalletModule,
    OrderModule,
    NotificationModule,
    locationhandlerModule,
    MongooseModule.forRoot('mongodb+srv://akawi:akawi@atlascluster.tjhlpc1.mongodb.net/?retryWrites=true&w=majority', {
      connectionFactory: (connection) => {
        // TODO: Implement soft deletes
        connection.plugin(require('mongoose-autopopulate'))

        return connection
      }
      }),
    NotificationModule,     
  ]
})
export class AppModule { }
