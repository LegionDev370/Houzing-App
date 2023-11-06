import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role-decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Review')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create review',
  })
  @Post('create/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'USER', 'ADMIN')
  createReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(createReviewDto, id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all reviews',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'USER', 'ADMIN')
  findAllReviews() {
    return this.reviewsService.findAllReviews();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get one review',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'USER', 'ADMIN')
  findOneReview(@Param('id') id: string) {
    return this.reviewsService.findOneReview(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove review',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'USER', 'ADMIN')
  removeReview(@Param('id') id: string) {
    return this.reviewsService.removeReview(id);
  }
}
