import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsEmail()
    email : string
}