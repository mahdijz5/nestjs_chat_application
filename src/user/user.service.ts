import { RoomRepository } from './../room/room.repository';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostParams, UpdatePostParams } from 'src/utils/types';
import { User } from './entities/user.entity';
import { Room } from 'src/room/entities/room.entity';

@ApiTags("User")
@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository,private roomRepository : RoomRepository) {}


    async getUser(id: number) {
        try {
            const user = await this.userRepository.findOne({where : {id}, relations : {rooms : true,messages : true,}})
            if (!user) throw new NotFoundException()

            return user
        } catch (error) {
            throw error
        }
    }

    async joinRoom(roomId : number,userId : number) : Promise<Room> {
        try {
            const user =await this.userRepository.findOne({where :{id :userId} , relations : {rooms : true}})
            const room = await this.roomRepository.findOneById(roomId,{members : true})
            if(!room) throw new BadRequestException("Room not found.")


            if(user.rooms.indexOf(room) < 0) {
                user.rooms.push(room)
                await this.userRepository.save(user)
            }

            return room
        } catch (error) {
            throw error
        }
    }

}
