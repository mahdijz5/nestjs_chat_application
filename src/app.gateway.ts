import { UserService } from './user/user.service';
import { Request, query } from 'express';
import { RoomService } from './room/room.service';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards, UsePipes, ValidationPipe, UseFilters, Injectable,Scope, Query } from '@nestjs/common';
import { CreateMessageDto } from './message/dto/createMessage.dto';
import {
    SubscribeMessage,
    OnGatewayConnection,
    MessageBody,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtSocketGuard } from './auth/guards/jwt-socket.guard';
import { UserData } from './decorators/userData.decorator';
import { UserDataWs } from './decorators/userWs.decorator';
import UserDataInterface from './interface.ts/userData.interface';
import { QueryWs } from './decorators/queryWs.decorator';


@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@UseGuards(JwtSocketGuard)
@UsePipes(new ValidationPipe())
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private roomService: RoomService,private userService: UserService) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('send_message')
    async handleSendMessage( @ConnectedSocket() client: Socket,@MessageBody() payload: CreateMessageDto,@UserDataWs() user : UserDataInterface,  ): Promise<void> {
        try {
            this.server.to("room"+payload.roomId).emit('receive_message', {user : {...user},...payload});
        } catch (error) {
            this.handleError(error,client.id)
        }
    }

    @SubscribeMessage('join_room')
    async joiningRoom( @ConnectedSocket() client: Socket,@UserDataWs() user : UserDataInterface, @QueryWs("roomId") roomId : number ): Promise<void> {
        try {
            const room =await this.userService.joinRoom(roomId,user.id)
            client.join("room"+room.id)
            this.server.to(client.id).emit('response', `You joined to ${room.name}`);
        } catch (error) {
            this.handleError(error,client.id)
        }
    }

    @SubscribeMessage('get_rooms')
    async getRooms( @ConnectedSocket() client: Socket,@QueryWs("search") search : string ): Promise<void> {
        try {
            const rooms = await this.roomService.getRooms(search)
            this.server.to(client.id).emit('get_rooms', rooms);
        } catch (error) {
            this.handleError(error,client.id)
        }
    }

    @SubscribeMessage('load_room')
    async loadRoom( @ConnectedSocket() client: Socket,@QueryWs("roomId") roomId : number ): Promise<void> {
        try {
            console.log(client.connected)
            const room = await this.roomService.loadRoom(roomId)
            this.server.to(client.id).emit('load_room', room);
        } catch (error) {
            this.handleError(error,client.id)
        }
    }


    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`)
    }

    async handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`)
    }

    private handleError(err : Error,id : string) {
        this.server.to(id).emit("error_handler",err)
    }
}
