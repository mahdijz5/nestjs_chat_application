import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtSocketGuard extends AuthGuard('jwt-socket') {

    getRequest(context: ExecutionContext) {
        return context.switchToWs().getClient().handshake;
    }
}