import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueryWs = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
        const req = ctx.switchToWs().getClient();
        if(data) {
            return req.handshake.query[data];
        }else {
            return req.handshake.query;
        }
    },
);