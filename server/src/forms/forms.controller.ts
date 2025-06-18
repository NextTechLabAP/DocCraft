import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FormsService } from './forms.service';
import { create } from 'domain';

@Controller('forms')
export class FormsController {
    constructor(private readonly formsService: FormsService) {}
     
    @Post()
    async createForm(@Body()createFormDto: any): Promise<any> {
        return this.formsService.createForm(create);

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
