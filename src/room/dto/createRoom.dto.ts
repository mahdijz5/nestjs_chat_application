import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoomDto {
    
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        maxLength : 150,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1,150)
    name : string
}