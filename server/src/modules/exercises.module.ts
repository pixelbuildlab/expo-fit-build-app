import {Module} from '@nestjs/common';
import {ExercisesController} from '../controllers/exercises.controller';
import {SanityService} from '../services/sanity.service';

@Module({
  controllers: [ExercisesController],
  providers: [SanityService],
  exports: [SanityService],
})
export class ExercisesModule {}
