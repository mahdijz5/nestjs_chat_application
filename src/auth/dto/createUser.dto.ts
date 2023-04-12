import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString,IsEmail, Length } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        maxLength : 150,
    })
    @IsNotEmpty()
    @IsEmail()
    @Length(0, 150)
    email : string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        maxLength:150,
    })
    @IsNotEmpty()
    @IsString()
    @Length(0, 150)
    username : string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        minLength : 5,
        maxLength : 60
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 60)
    password : string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 60)
    confirmPassword : string   
}