import { UserData } from './../decorators/userData.decorator';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { UserService } from './user.service';
import {Inject, Controller, Get, Param, ParseIntPipe,  } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProvidersEnum } from '../utils/enums';
import UserDataInterface from 'src/interface.ts/userData.interface';


@ApiTags("User")
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private userService : UserService) {}

    @ApiOperation({ summary: "Get user by id" })
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        try {
            return await this.userService.getUser(id)
        } catch (error) {
            throw error
        }
    }

}
