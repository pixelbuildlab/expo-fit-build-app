import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ExercisesModule} from './modules/exercises.module';
import {AIModule} from './modules/ai.module';
import {HealthModule} from './modules/health.module';
import {CheckModule} from './modules/check.module';
import configuration from './config/configuration';
import {validate} from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    ExercisesModule,
    AIModule,
    HealthModule,
    CheckModule,
  ],
})
export class AppModule {}
