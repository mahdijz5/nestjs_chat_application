import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { Room } from './room/entities/room.entity';
import { Message } from './message/entities/message.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SERVER_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,Room,Message],
      synchronize: true,
    }),EventModule,UserModule,AuthModule, MessageModule, RoomModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
