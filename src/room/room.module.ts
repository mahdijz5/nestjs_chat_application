import { Module,forwardRef } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Message } from '../message/entities/message.entity';
import { Room } from './entities/room.entity';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports :[TypeOrmModule.forFeature([User,Message,Room]),MessageModule,forwardRef(() => UserModule)],
  controllers: [RoomController],
  providers: [RoomService,RoomRepository],
  exports : [RoomRepository,RoomService]
})
export class RoomModule {}
