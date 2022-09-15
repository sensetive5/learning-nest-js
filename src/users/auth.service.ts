import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scryptSync } from "crypto"; 

@Injectable()
export class AuthService {
    constructor (private userService: UsersService) {}

    async signUp (email: string, password: string) {
        const foundUser = await this.userService.find(email);

        if (foundUser.length) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = this.processPassword(password);

        const user = await this.userService.create(email, hashedPassword);

        return user;
    }

    async signIn (email: string, password: string) {
        const [foundUser] = await this.userService.find(email);

        if (foundUser == null) {
            throw new NotFoundException('User with this email not found');
        }

        const [salt, storedPasswordHash] = foundUser.password.split('.');

        const hashedPassword = scryptSync(password, salt, 32);

        if (storedPasswordHash === hashedPassword.toString('hex')) {
            return foundUser;
        } else {
            throw new BadRequestException('Wrong password');
        }
    }

    private processPassword (password: string) {
        const salt = randomBytes(8).toString('hex');
        const hash = scryptSync(password, salt, 32)

        return salt + '.' + hash.toString('hex');
    }
}