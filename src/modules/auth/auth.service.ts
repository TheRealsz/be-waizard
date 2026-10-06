import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { User } from "../../generated/prisma/client";

type UserInfo = Omit<User, "passwordHash">

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, pass: string): Promise<UserInfo | null> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(pass, user.passwordHash);
        if (!isMatch) {
            return null;
        }

        const { passwordHash, ...result } = user;
        return result;
    }
}

