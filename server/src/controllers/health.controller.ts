import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiKeyGuard} from '../guards/api-key.guard';
import type {ApiResponse} from '../types';

@Controller('health')
@UseGuards(ApiKeyGuard)
export class HealthController {
  @Get()
  getHealth(): ApiResponse<{
    status: string;
    timestamp: string;
    version: string;
  }> {
    return {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
      message: 'Backend is running',
    };
  }
}
