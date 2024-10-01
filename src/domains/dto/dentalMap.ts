import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

import { UserDto } from './user';

class Tooth {
  @IsOptional() @IsBoolean() removed?: boolean;
  @IsOptional() @IsBoolean() crown?: boolean;
  @IsOptional() @IsBoolean() implant?: boolean;
  @IsOptional() @IsBoolean() description?: string;
}

class Zone4 {
  @IsOptional() @IsBoolean() z1: boolean;
  @IsOptional() @IsBoolean() z2: boolean;
  @IsOptional() @IsBoolean() z3: boolean;
  @IsOptional() @IsBoolean() z4: boolean;
}

class Segment2 {
  @IsOptional() @IsString() c1: string;
  @IsOptional() @IsString() c2: string;
}
class Segment4 extends Segment2 {
  @IsOptional() @IsString() c3: string;
  @IsOptional() @IsString() c4: string;
}

class Zone5 extends Zone4 {
  @IsOptional() @IsBoolean() z5: boolean;
}
class FiveZoneTooth extends Tooth {
  @ValidateNested({ each: true })
  @Type(() => Zone5)
  zones: Zone5;
  @ValidateNested({ each: true })
  @Type(() => Segment4)
  segments: Segment4;
}

class FourZoneTooth extends Tooth {
  @ValidateNested({ each: true })
  @Type(() => Zone4)
  zones: Zone4;
  @ValidateNested({ each: true })
  @Type(() => Segment2)
  segments: Segment2;
}

class Chart {
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t18: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t16: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t28: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t27: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t26: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t38: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t37: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t36: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t48: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t47: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FiveZoneTooth)
  t46: FiveZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t15: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t14: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t13: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t12: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t11: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t25: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t24: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t23: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t22: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t21: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t35: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t34: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t33: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t32: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t31: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t45: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t44: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t43: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t42: FourZoneTooth;
  @ValidateNested({ each: true })
  @Type(() => FourZoneTooth)
  t41: FourZoneTooth;
}

export class DentalMapDto {
  @ValidateNested({ each: true })
  @Type(() => Chart)
  chart: UserDto;
  @IsString()
  @IsOptional()
  notes?: string;
}
