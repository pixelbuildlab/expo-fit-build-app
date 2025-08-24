import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import type {ApiResponse} from '../types';

let globalRequestCount = 0;
let currentDate = new Date().toDateString();

@Controller()
export class CheckController {
  @Get()
  getCheck(): ApiResponse<{message: string}> {
    const today = new Date().toDateString();
    const maxRequests = 30;

    if (today !== currentDate) {
      globalRequestCount = 0;
      currentDate = today;
    }

    if (globalRequestCount >= maxRequests) {
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    globalRequestCount++;

    return {
      success: true,
    };
  }
}
