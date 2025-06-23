import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, QuestionType } from '@prisma/client';
import { CreateFormDto, CreateQuestionDto } from './dto/form.dto';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  async createForm(data: CreateFormDto): Promise<any> {
    return this.prisma.form.create({
      data: {
        title: data.title,
        creatorId: data.creatorId,
        questions: {
          create: data.questions.map((q) => {
            const type = q.type.toLowerCase() as QuestionType;
            return {
              title: q.title,
              type,
              answer: q.answer,
            };
          }),
        },
      },
      include: { questions: true },
    });
  }

  async getFormByUser(userId: string): Promise<any> {
    return this.prisma.form.findMany({
      where: { creatorId: userId },
      include: { questions: true },
    });
  }

  async getFormById(id: string): Promise<any> {
    return this.prisma.form.findUnique({
      where: { id },
      include: { questions: true },
    });
  }
}
