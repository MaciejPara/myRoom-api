import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
