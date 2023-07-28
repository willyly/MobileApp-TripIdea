import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    // !!!! do not change username to email, it is strongly required !!!! 不能更改username!!!!!
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        console.log('LocalStrategy.validate() user: ', user);
        if (!user) {
            throw new UnauthorizedException("LocalStrategy Validate failed");
        }
        return user;
    }
}