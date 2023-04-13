import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDataWs = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToWs().getClient();
        return req.handshake.user;
    },
);