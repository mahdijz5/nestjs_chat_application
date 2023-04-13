import { RoomService } from './room.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UserData } from 'src/decorators/userData.decorator';
import UserDataInterface from 'src/interface.ts/userData.interface';

@Controller('room')
@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class RoomController {
    constructor(private roomService: RoomService){}

    @ApiOperation({summary: "create new message"})
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post("createRoom")
    async createRoom(@Body() body : CreateRoomDto,@UserData() user : UserDataInterface) {
        try {
            return await this.roomService.createRoom(body,user.id)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({summary: "get room  "})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @Get("get/:roomId")
    async getRoom(@Param("roomId",ParseIntPipe) roomId : number) {
        try {
            return await this.roomService.getRoom(roomId)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({summary: "Load room (messages,members) "})
    @ApiUnauthorizedResponse()
    @ApiNotFoundResponse()
    @ApiOkResponse()
    @Get("load/:roomId")
    async LoadRoom(@Param("roomId",ParseIntPipe) roomId : number) {
        try {
            return await this.roomService.loadRoom(roomId)
        } catch (error) {
            throw error
        }
    }

}
