import { ArgumentsHost, Catch, HttpException, Injectable } from '@nestjs/common';
import { WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppGateway } from './app.gateway';


@Catch(WsException, HttpException)
export class WsExceptionFilter {
    server: Server
    constructor(private appGateway) {
        this.server = appGateway.server
    }


    public catch(exception: HttpException, host: ArgumentsHost) {
        const client = host.switchToWs().getClient();
        this.handleError(client, exception);
    }

    public handleError(client: Socket, exception: HttpException | WsException) {
        if (exception instanceof HttpException) {
            this.appGateway.server.to(client.id).emit("error_handler", exception.message)
            console.log(exception)
        } else {
            console.log(exception)
            this.appGateway.server.to(client.id).emit("error_handler", exception.message)
        }
    }
}