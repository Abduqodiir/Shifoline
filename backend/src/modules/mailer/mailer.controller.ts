import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reciepe')
@Controller('mailer')
export class MailerController {
    constructor(private readonly mailerService: MailerService) { }

    @Post('send')
    async sendMail(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('subject') subject: string,
        @Body('message') message: string,
    ) {
        await this.mailerService.sendMail(name, email, subject, message);
        return { message: 'Email sent successfully' };
    }
}