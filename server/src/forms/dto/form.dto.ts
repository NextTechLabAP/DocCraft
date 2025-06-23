import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { QuestionType } from '@prisma/client';
  
  export class CreateQuestionDto {
    @IsString()
    title: string;
  
    @IsEnum(QuestionType, { message: 'Invalid question type' })
    type: QuestionType;
  
    @IsOptional()
    answer: any;
  }
  
  export class CreateFormDto {
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    creatorId?: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
  }
  