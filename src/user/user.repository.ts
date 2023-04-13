import { DeepPartial, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) { }

    create(data : DeepPartial<User>) {
        const user =  this.userRepository.create(data)
        return user
    }

    async findOneBy(certificate: FindOptionsWhere<User>) {
        return await this.userRepository.findOneBy(certificate)
    }

    async findOne(certificate: FindOneOptions<User>) {
        return await this.userRepository.findOne(certificate)
    }

    async update(certificate : FindOptionsWhere<User>,data :  DeepPartial<User>) {
        return  await this.userRepository.update(certificate, data)
    }

    async remove(user: User) {
        return await this.userRepository.remove(user)
    }

    async save(user : User) {
        return await this.userRepository.save(user)
    }

}
