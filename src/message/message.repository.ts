import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class MessageRepository {
    constructor(@InjectRepository(Message) private messageRepository : Repository<Message>) {}

    async findOneById(id :number) : Promise<Message> {
        return await this.messageRepository.findOneBy({id})
    }

    async getMessagesOfRoom(id :number) :Promise<Message[]>{
        let messageList = []
        const messages = await this.messageRepository.manager.getTreeRepository(Message).find({
            where: {
                room : {
                    id
                }
            },
            relations: {
                author : true,
                children : true,
            }
        })

        for (const message of messages) messageList.push(await this.messageRepository.manager.getTreeRepository(Message).findDescendantsTree(message))

        return messageList
    }

    createMessage(data : DeepPartial<Message>) : Message {
        return this.messageRepository.create(data)
    }

    async createMessageAndSave(data : DeepPartial<Message>)  : Promise<Message>{
        const msg= this.messageRepository.create(data)
        return await this.save(msg)
    }

    async save(msg:Message) : Promise<Message> {
        return await this.messageRepository.save(msg)
    }

}
