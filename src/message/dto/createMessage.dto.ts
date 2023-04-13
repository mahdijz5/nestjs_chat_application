import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateMessageDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        maxLength : 650,
    })
    @IsNotEmpty()
    @IsString()
    @Length(0,650)
    content : string

    @ApiProperty({
        type: Number,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsNumber()
    roomId : number
}