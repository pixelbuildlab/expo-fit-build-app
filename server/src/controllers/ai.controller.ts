import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {AIService} from '../services/ai.service';
import {SanityService} from '../services/sanity.service';
import {ExerciseInstructionsDto} from '../dto/exercise-instructions.dto';
import {ApiKeyGuard} from '../guards/api-key.guard';
import type {ApiResponse} from '../types';

@Controller('ai')
@UseGuards(ApiKeyGuard)
export class AIController {
  constructor(
    private readonly aiService: AIService,
    private readonly sanityService: SanityService,
  ) {}

  @Post('exercise-instructions')
  async getExerciseInstructions(
    @Body() body: ExerciseInstructionsDto,
  ): Promise<ApiResponse<{instructions: string}>> {
    try {
      const {exerciseID} = body;

      if (!exerciseID) {
        throw new HttpException(
          {
            success: false,
            error: 'Exercise ID is required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const exercise = await this.sanityService.getExerciseById(exerciseID);

      if (!exercise || !exercise.name) {
        throw new HttpException(
          {
            success: false,
            error: 'Exercise not found or has no name',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const instructions = await this.aiService.getExerciseInstructions(
        exercise.name,
      );

      return {
        success: true,
        data: {
          instructions,
        },
        message: 'Exercise instructions generated successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('AI Exercise Instructions Error:', error);
      throw new HttpException(
        {
          success: false,
          error: 'Failed to generate exercise instructions',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
