import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {createClient} from '@sanity/client';
import type {
  ExerciseQueryResult,
  SingleExerciseQueryResult,
} from '../types/sanity';
import {defineQuery} from 'groq';

const singleExerciseQuery = defineQuery(
  '*[_type == "exercise" && _id == $id][0]',
);

@Injectable()
export class SanityService {
  private client;

  constructor(private configService: ConfigService) {
    this.client = createClient({
      projectId: this.configService.get<string>('sanity.projectId'),
      dataset: this.configService.get<string>('sanity.dataset'),
      apiVersion: this.configService.get<string>('sanity.apiVersion'),
      useCdn: false, // Always fresh data for API
    });
  }

  async getAllExercises(): Promise<ExerciseQueryResult> {
    const result = await this.client.fetch(`
      *[_type == "exercise"]{
        _id,
        name,
        _type,
        description,
        exerciseImage,
        videoUrl,
        difficultyLevel,
        isActive
      }
    `);
    return result as ExerciseQueryResult;
  }

  async getExerciseById(id: string): Promise<SingleExerciseQueryResult> {
    const result = await this.client.fetch(singleExerciseQuery, {id});
    return result as SingleExerciseQueryResult;
  }
}
