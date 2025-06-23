import {
    Body,
    Controller,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { FormsService } from './forms.service';
  import { CreateFormDto } from './dto/form.dto';
  import { QuestionType } from '@prisma/client';
  
  @Controller('forms')
  export class FormsController {
    constructor(private readonly formsService: FormsService) {}
  
    @Post()
    async createForm(@Body() createFormDto: CreateFormDto): Promise<any> {
      // Transform type strings to QuestionType enum values
      const transformedDto = {
        ...createFormDto,
        questions: createFormDto.questions.map((q) => ({
          ...q,
          type: q.type.toLowerCase() as QuestionType,
        })),
      };
  
      return this.formsService.createForm(transformedDto);
    }
  
    @Get(':id')
    async getFormById(@Param('id') id: string): Promise<any> {
      return this.formsService.getFormById(id);
    }
  
    @Get('user/:userId')
    async getUserForms(@Param('userId') userId: string): Promise<any> {
      return this.formsService.getFormByUser(userId);
    }
  }
  