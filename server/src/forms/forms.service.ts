import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormsService {
    constructor(private readonly prisma: PrismaService) {}

    async createForm(data: any): Promise<any> {
        return this.prisma.form.create({
            data,
        });
    }
    async getFormByUser(userId: string): Promise<any> {
        return this.prisma.form.findMany({
            where: {creatorId: userId }
        });

    }
    async getFormById(id: string): Promise<any> {
        return this.prisma.form.findUnique({
            where: { id: id },
        });
    }
}
