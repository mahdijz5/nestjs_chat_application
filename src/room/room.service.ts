import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { UserRepository } from '../user/user.repository';
import { createRoomParams } from '../utils/types';
import { Room } from './entities/room.entity';
import { Like } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(private roomRepository : RoomRepository,private userRepository : UserRepository) {}
    
    async createRoom(data : createRoomParams,id : number) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if(!user) throw new BadRequestException("User not found")
            const room = this.roomRepository.createRoom(data)
            room.owner=user
            return await this.roomRepository.save(room)
        } catch (error) {
            throw error
        }
    }

    async getRoom(id : number) : Promise<Room> {
        try {
            const room = await this.roomRepository.findOneById(id)
            if(!room) throw new NotFoundException("Room not found.")
            return room
        } catch (error) {
            throw error
        }
    }

    async getRooms(name : string) : Promise<Room[]> {
        try {
            return await this.roomRepository.search(name)
        } catch (error) {
            throw error
        }
    }
}
