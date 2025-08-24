import {Module} from '@nestjs/common';
import {CheckController} from '../controllers/check.controller';

@Module({
  controllers: [CheckController],
})
export class CheckModule {}
