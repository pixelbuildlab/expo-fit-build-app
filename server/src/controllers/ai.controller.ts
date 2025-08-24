import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {AIService} from '../services/ai.service';
import {ExerciseInstructionsDto} from '../dto/exercise-instructions.dto';
import {ApiKeyGuard} from '../guards/api-key.guard';
import type {ApiResponse} from '../types';

@Controller('ai')
@UseGuards(ApiKeyGuard)
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('exercise-instructions')
  async getExerciseInstructions(
    @Body() body: ExerciseInstructionsDto,
  ): Promise<ApiResponse<{instructions: string}>> {
    try {
      const {exerciseName} = body;

      if (!exerciseName) {
        throw new HttpException(
          {
            success: false,
            error: 'Exercise name is required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const instructions =
        await this.aiService.getExerciseInstructions(exerciseName);

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
