import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    buyerId: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    sellerId: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    productId: number;

    @IsString()
    text: string;
}
