import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProvidersEnum } from 'src/utils/enums';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }), AuthModule,forwardRef(() => RoomModule)],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports : [UserRepository,UserService]
})
export class UserModule {}
