import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {SanityService} from '../services/sanity.service';
import {ApiKeyGuard} from '../guards/api-key.guard';
import type {
  ApiResponse,
  ExerciseQueryResult,
  SingleExerciseQueryResult,
} from '../types';

@Controller('exercises')
@UseGuards(ApiKeyGuard)
export class ExercisesController {
  constructor(private readonly sanityService: SanityService) {}

  @Get()
  async getAllExercises(): Promise<ApiResponse<ExerciseQueryResult>> {
    try {
      const exercises = await this.sanityService.getAllExercises();
      return {
        success: true,
        data: exercises,
      };
    } catch (error) {
      console.error('Exercises API Error:', error);
      throw new HttpException(
        {
          success: false,
          error: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getExerciseById(
    @Param('id') id: string,
  ): Promise<ApiResponse<SingleExerciseQueryResult>> {
    try {
      const exercise = await this.sanityService.getExerciseById(id);
      if (!exercise) {
        throw new HttpException(
          {
            success: false,
            error: 'Exercise not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        data: exercise,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Exercise API Error:', error);
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
