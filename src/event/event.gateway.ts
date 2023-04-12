import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class EventGateWay {
    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        console.log(123)
        return data;
    }
}