import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResponsesService {
    constructor(private readonly prisma: PrismaService) {}

    async createResponse(data: { formId: string; data: any }): Promise<any> {
        return this.prisma.response.create({
            data: {
                formId: data.formId,
                data: data.data,
            },
        });
    }

    async getResponsesByFormId(formId: string): Promise<any[]> {
        return this.prisma.response.findMany({
            where: { formId },
        });
    }
}
