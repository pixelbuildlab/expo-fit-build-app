import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import {SanityService} from '../services/sanity.service';
import {ApiKeyGuard} from '../guards/api-key.guard';
import type {
  ApiResponse,
  GetSingleWorkoutQueryResult,
  GetWorkoutQueryResult,
  WorkoutDocument,
} from '../types';

@Controller('workout')
@UseGuards(ApiKeyGuard)
export class WorkoutController {
  constructor(private readonly sanityService: SanityService) {}

  @Get('history/:userId')
  async getAllWorkout(
    @Param('userId') userId: string,
  ): Promise<ApiResponse<GetWorkoutQueryResult>> {
    try {
      const workoutHistory = await this.sanityService.getWorkoutHistory(userId);
      return {
        success: true,
        data: workoutHistory,
      };
    } catch (error) {
      console.error('Workout API Error:', error);
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async getWorkoutById(
    @Param('id') id: string,
  ): Promise<ApiResponse<GetSingleWorkoutQueryResult>> {
    try {
      const workout = await this.sanityService.getSingleWorkoutById(id);
      if (!workout) {
        throw new HttpException(
          {
            success: false,
            error: 'Workout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        data: workout,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Workout API Error:', error);
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/admin/:id')
  async deleteWorkoutById(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const workout = await this.sanityService.deleteWorkoutById(id);
      if (!workout) {
        throw new HttpException(
          {
            success: false,
            error: 'Workout not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Workout deleted',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Workout API Error:', error);
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('/admin/create')
  async createWorkout(
    @Body() workoutData: WorkoutDocument,
  ): Promise<ApiResponse> {
    try {
      const workout = await this.sanityService.createWorkout(workoutData);
      if (!workout) {
        throw new HttpException(
          {
            success: false,
            error: 'Failed to create workout',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: 'Workout created',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Workout API Error:', error);
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
