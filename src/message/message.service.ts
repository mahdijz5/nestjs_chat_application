import { RoomRepository } from './../room/room.repository';
import { UserRepository } from 'src/user/user.repository';
import { createMessageParams } from 'src/utils/types';
import { MessageRepository } from './message.repository';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MessageService {
    constructor(private messageRepository: MessageRepository,private userRepository: UserRepository,private roomRepository:RoomRepository,) { }

    async createMessage(data: createMessageParams,userId :number,roomId : number) {
        try {
            const user =await this.userRepository.findOneBy({id : userId})
            const room = await this.roomRepository.findOneById(roomId)
            if(!room || !user) throw new BadRequestException("Room or User not found")

            const msg =  this.messageRepository.createMessage(data)
            
            msg.author = user;
            msg.room = room;

            return await this.messageRepository.save(msg)
            
        } catch (error) {
            throw error
        }
    }

    async replyMessage(data: createMessageParams,userId :number,roomId : number,msgId :number) {
        try {
            const user =await this.userRepository.findOneBy({id : userId})
            const room = await this.roomRepository.findOneById(roomId)
            if(!room || !user) throw new BadRequestException("Room or User not found")
            const replyedMsg = await this.messageRepository.findOneById(msgId)
            if(!replyedMsg) throw new BadRequestException("Message not found")

            const msg =  this.messageRepository.createMessage(data)
            
            msg.parent = replyedMsg
            msg.author = user;
            msg.room = room;

            return await this.messageRepository.save(msg)
            
        } catch (error) {
            throw error
        }
    }
}
