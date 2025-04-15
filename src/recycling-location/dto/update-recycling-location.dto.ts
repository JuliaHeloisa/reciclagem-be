/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecyclingLocationDto } from './create-recycling-location.dto';

export class UpdateRecyclingLocationDto extends PartialType(
  CreateRecyclingLocationDto,
) {}
