import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Feature {
  @ApiProperty()
  @Prop({
    default: false,
  })
  air_condition: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  lawn: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  @ApiProperty()
  refrigerator: boolean;
  @Prop({
    default: false,
  })
  @ApiProperty()
  washer: boolean;
  @Prop({
    default: false,
  })
  barbeque: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  laundry: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  sauna: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  wifi: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  dryer: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  microwave: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  swimming_pool: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  window_coverings: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  gym: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  outdoor_shower: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  tv_cable: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  dining_room: boolean;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
