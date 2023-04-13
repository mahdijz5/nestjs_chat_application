import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtSocketStrategy extends PassportStrategy(Strategy,'jwt-socket') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('accessToken'),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKRN_SECRET
        })
    }

        async validate(payload:any) {
            return await payload
        }
    
}