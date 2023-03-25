import { IsString , IsNotEmpty} from "class-validator";

export class RoomDto {
	
	@IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    type: string
    @IsNotEmpty()
    @IsString()
    owner: string
	
}