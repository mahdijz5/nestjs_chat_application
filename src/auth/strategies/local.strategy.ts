import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable} from "@nestjs/common"
import { Strategy } from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
    super({
        usernameField : "email"
    })
    }


    async validate(email: string, password: string) {
        try {
            const user = await this.authService.validate(email, password)
            return user
        } catch (error) {
            throw error
        }
    }
}