import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret, // this secret to decrypt the bearer token coming from request
        });
    }

    async validate(payload: any): Promise<any> {
        // console.log('JwtStrategy validate payload: ', payload);
        return { userId: payload.sub, username: payload.username };
    }
}