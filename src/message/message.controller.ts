import { MessageService } from './message.service';
import { Controller, Post, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto'
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserData } from 'src/decorators/userData.decorator';
import UserDataInterface from 'src/interface.ts/userData.interface';
import { ReplyMessageDto } from './dto/replyMessage.dto';

@ApiBearerAuth()
@ApiTags("Messages")
@UseGuards(JwtGuard)
@Controller('message')
export class MessageController {
    constructor(private messageService :MessageService) {}

    @ApiOperation({summary: "Sending new message"})
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post("sendMessage")
    async createMessage(@Body() body : CreateMessageDto,@UserData() user : UserDataInterface) {
        try {
            return await this.messageService.createMessage({content : body.content},user.id,body.roomId)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({summary: "reply to message"})
    @ApiUnauthorizedResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post("sendMessage")
    async replyMessage(@Body() body : ReplyMessageDto,@UserData() user : UserDataInterface) {
        try {
            return await this.messageService.replyMessage({content : body.content},user.id,body.roomId,body.msgId)
        } catch (error) {
            throw error
        }
    }
}
