import { IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    user_name: string;  
         
    @IsNotEmpty()
    @IsString()
    user_email: string;  

    @IsNotEmpty()
    @IsString()
    password: string;  

    @IsNotEmpty()
    @IsString()
    user_phone: string;

    @IsNotEmpty()
    blind_discapacity_percentage: number=0.0;

    
}

