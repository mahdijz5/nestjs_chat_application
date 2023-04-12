import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    email : string


    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    password : string
}