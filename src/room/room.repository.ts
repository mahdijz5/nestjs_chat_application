import { UserRepository } from 'src/user/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { DeepPartial, FindOneOptions, FindOptionsRelations, FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class RoomRepository {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>,) { }

    async search(name: string): Promise<Room[]> {
        if(name) {
            return await this.roomRepository.find({
                where : {name : Like(name)},
                relations: { members: true }
            })
        }else {
            return await this.roomRepository.find({
                relations: { members: true }
            })
        } 
    }

    async findOneById(id: number,relations? :FindOptionsRelations<Room> ) {
        const room = await this.roomRepository.findOne({
            where: { id },
            relations,
        })
        return room
    }

    createRoom(data: DeepPartial<Room>): Room {
        return this.roomRepository.create(data)
    }

    async createRoomAndSave(data: DeepPartial<Room>): Promise<Room> {
        const room = this.createRoom(data)
        return await this.save(room)
    }

    async save(room: Room): Promise<Room> {
        return await this.roomRepository.save(room)
    }

}
