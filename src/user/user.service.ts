import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostParams, UpdatePostParams } from 'src/utils/types';
import { User } from './entities/user.entity';

@ApiTags("User")
@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository) {}


    async getUser(id: number) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if (!user) throw new NotFoundException()

            return user
        } catch (error) {
            throw error
        }
    }

}
