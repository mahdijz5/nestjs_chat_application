import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) { }

    create(data : object) {
        const user =  this.userRepository.create(data)
        return user
    }

    async findOneBy(certificate: object) {
        return await this.userRepository.findOneBy(certificate)
    }

    async findOne(certificate: object) {
        return await this.userRepository.findOne(certificate)
    }

    async update(certificate :object,data : object) {
        return  await this.userRepository.update(certificate, data)
    }

    async remove(user: User) {
        return await this.userRepository.remove(user)
    }

    async save(user : User) {
        return await this.userRepository.save(user)
    }

}
