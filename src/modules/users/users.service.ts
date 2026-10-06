import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "../../generated/prisma/client";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) { }

    async findByEmail(email: string): Promise<User | null | undefined> {
        if (!email) {
            throw new BadRequestException('Token has no email claim');
        }

        try {
            return await this.usersRepository.find(email)
        } catch (error) {
            throw error
        }
    }
}

