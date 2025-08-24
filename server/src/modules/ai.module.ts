import {Module} from '@nestjs/common';
import {AIController} from '../controllers/ai.controller';
import {AIService} from '../services/ai.service';
import {SanityService} from '../services/sanity.service';

@Module({
  controllers: [AIController],
  providers: [AIService, SanityService],
  exports: [AIService],
})
export class AIModule {}
