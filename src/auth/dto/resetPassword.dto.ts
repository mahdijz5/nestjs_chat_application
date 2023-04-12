import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class ResetPasswordDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    @Length(5,60)
    password: string

    @ApiProperty({
        type: String,
        description: 'It should be same as password',
    })
    @IsNotEmpty()
    @IsString()
    @Length(5,60)
    confirmPassword: string
} 