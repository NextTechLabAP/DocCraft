import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { FormsService } from './forms.service';
  import { CreateFormDto } from './dto/form.dto';
  import { QuestionType } from '@prisma/client';
  import { ResponsesService } from '../responses/responses.service';
  
  @Controller('forms')
  export class FormsController {
    constructor(
      private readonly formsService: FormsService,
      private readonly responsesService: ResponsesService,
    ) {}
  
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
  
    @Post(':formId/submit')
    async submitForm(
      @Param('formId') formId: string,
      @Body() body: { answers: { questionId: string; answer: string }[] }
    ): Promise<any> {
      return this.responsesService.createResponse({ formId, answers: body.answers });
    }
  
    @Get(':id')
    async getFormById(@Param('id') id: string): Promise<any> {
      return this.formsService.getFormById(id);
    }
  
    @Get('user/:userId')
    async getUserForms(@Param('userId') userId: string): Promise<any> {
      return this.formsService.getFormByUser(userId);
    }

    @Get(':formId/responses')
    async getFormResponses(@Param('formId') formId: string): Promise<any[]> {
      return this.responsesService.getResponsesByFormId(formId);
    }

    @Put(':formId')
    async updateForm(
      @Param('formId') formId: string,
      @Body() updateFormDto: CreateFormDto
    ): Promise<any> {
      // Transform type strings to QuestionType enum values
      const transformedDto = {
        ...updateFormDto,
        questions: updateFormDto.questions.map((q) => ({
          ...q,
          type: q.type.toLowerCase() as QuestionType,
        })),
      };
      return this.formsService.updateForm(formId, transformedDto);
    }
  }
  