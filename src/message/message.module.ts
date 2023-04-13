import { Module, forwardRef } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message,Room,User]),AuthModule,forwardRef(()=> UserModule),forwardRef(()=> RoomModule)],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports : [ MessageRepository,MessageService]
})
export class MessageModule {}
