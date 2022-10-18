import { Image } from "../schemas/image-schema";
export declare class CreateUserDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    profileImage: Image;
    static transformer(dto: CreateUserDto): CreateUserDto;
}
