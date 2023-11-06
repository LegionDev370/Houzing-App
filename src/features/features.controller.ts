import { Controller, Put, Post, Body, Param } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Feature')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create feature',
  })
  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update feature',
  })
  @Put(':id')
  updateFeatursProduct(
    @Param('id') id: string,
    @Body() createFeatureDto: CreateFeatureDto,
  ) {
    return this.featuresService.updateFeaturesProduct(createFeatureDto, id);
  }
}
