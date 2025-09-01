import {Module} from '@nestjs/common';
import {ExercisesController} from '../controllers/exercises.controller';
import {WorkoutController} from '../controllers/workout.controller';
import {SanityService} from '../services/sanity.service';

@Module({
  controllers: [ExercisesController, WorkoutController],
  providers: [SanityService],
  exports: [SanityService],
})
export class ExercisesModule {}
