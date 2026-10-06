import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    find(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }
}
