import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query, Headers } from '@nestjs/common';
import { PlanLikesService } from './plan_likes.service';
import { CreatePlanLikeDto } from './dto/create-plan_like.dto';
import { UpdatePlanLikeDto } from './dto/update-plan_like.dto';
import { ApiTags } from '@nestjs/swagger';
import { PlanLike } from './entities/plan_like.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@UseGuards(AuthGuard('jwt'))
@ApiTags('plan-likes')
@Controller('plan-likes')
export class PlanLikesController {
    constructor(private readonly planLikesService: PlanLikesService,
        private jwtService: JwtService
    ) { }

    @Post()
    async create(@Headers("authorization") authHeader, @Body() createPlanLikeDto: CreatePlanLikeDto) {
        let access_token = authHeader.replace("Bearer ", "");
        console.log("POST /user-like access_token: ", access_token);

        let userObject = await this.jwtService.verifyAsync(access_token, {
            secret: jwtConstants.secret
        });

        // console.log("POST /user-like userObject: ", userObject, ", createPlanLikeDto: ", createPlanLikeDto);

        return await this.planLikesService.create(createPlanLikeDto.travelPlanId, +userObject.id);
    }

    @Get()
    async findAll(): Promise<PlanLike[]> {
        return await this.planLikesService.findAll();
    }

    @Get(':id')
    async findByPlanId(@Param('id') id: string) {
        console.log({ id });

        return await this.planLikesService.findByPlanId(+id);
    }

    @Get('/user-like')
    async findOneByTravelPlanIdAndLikeUserId(@Headers("authorization") authHeader, @Query('travelPlanId') travelPlanId: number) {
        let access_token = authHeader.replace("Bearer ", "");
        console.log("POST /user-like access_token: ", access_token);

        let userObject = await this.jwtService.verifyAsync(access_token, {
            secret: jwtConstants.secret
        });
        console.log("POST /user-like userObject: ", userObject);

        return await this.planLikesService.findOneByTravelPlanIdAndLikeUserId(travelPlanId, userObject.id);
    }


    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: string, @Body() updatePlanLikeDto: UpdatePlanLikeDto) {
        return await this.planLikesService.update(+id, updatePlanLikeDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: string) {
        return await this.planLikesService.remove(+id);
    }
}

