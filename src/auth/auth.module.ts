import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { JwtSocketStrategy } from './strategies/jwtSocket.strategy';
import { JwtSocketGuard } from './guards/jwt-socket.guard';
 
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard,UserRepository,JwtSocketStrategy,JwtSocketGuard],
  controllers: [AuthController],
  exports: [JwtStrategy,JwtGuard,JwtSocketStrategy,JwtSocketGuard]
})
export class AuthModule {}
