// recycling-item/dto/create-recycling-item.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

// export enum MaterialType {
//   PLASTIC = 'plastic',
//   PAPER = 'paper',
//   GLASS = 'glass',
//   METAL = 'metal',
// }

export class CreateRecyclingItemDto {
  // @IsEnum(MaterialType)
  @IsString()
  material: string;

  @IsNumber()
  quantity: number;

  @IsString()
  unit: 'kg' | 'units';

  date: Date;

  @IsNotEmpty()
  @IsUUID()
  locationId: string;
}
