import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [RoomModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
