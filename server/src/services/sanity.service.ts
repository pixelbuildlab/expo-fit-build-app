import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {createClient, SanityClient, SanityDocument} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
  exerciseQuery,
  getSingleWorkoutQuery,
  getWorkoutQuery,
  singleExerciseQuery,
} from 'src/constants/groq';
import type {
  ExerciseQueryResult,
  GetSingleWorkoutQueryResult,
  GetWorkoutQueryResult,
  SingleExerciseQueryResult,
} from '../types/sanity';
import type {WorkoutDocument} from 'src/types';
import type {ImageUrlBuilder} from '@sanity/image-url/lib/types/builder';

@Injectable()
export class SanityService {
  private client: SanityClient;
  private adminClient: SanityClient;
  private imageBuilder: ImageUrlBuilder;

  constructor(private configService: ConfigService) {
    const clientConfigs = {
      projectId: this.configService.get<string>('sanity.projectId') ?? '',
      dataset: this.configService.get<string>('sanity.dataset') ?? '',
      apiVersion: this.configService.get<string>('sanity.apiVersion') ?? '',
      useCdn: false,
    };

    this.client = createClient(clientConfigs);

    this.adminClient = createClient({
      ...clientConfigs,
      token: this.configService.get<string>('sanity.apiToken'),
    });

    this.imageBuilder = imageUrlBuilder(clientConfigs);
  }

  private generateImageUrl(imageRef: string): string {
    if (!imageRef) return '';
    return this.imageBuilder.image(imageRef).url();
  }

  private addImageUrlToExercise(
    exercise: ExerciseQueryResult[number],
  ): ExerciseQueryResult[number] {
    if (exercise?.exerciseImage?.asset?._ref) {
      exercise.exerciseImage.asset._ref = this.generateImageUrl(
        exercise.exerciseImage.asset._ref,
      );
    }
    return exercise;
  }

  async getAllExercises(): Promise<ExerciseQueryResult> {
    const result = await this.client.fetch(exerciseQuery);

    // Add image URLs to each exercise
    return result.map(exercise => this.addImageUrlToExercise(exercise));
  }

  async getWorkoutHistory(userId: string): Promise<GetWorkoutQueryResult> {
    const result = await this.client.fetch(getWorkoutQuery, {userId});

    return result;
  }

  async getSingleWorkoutById(
    workoutId: string,
  ): Promise<GetSingleWorkoutQueryResult> {
    const result = await this.client.fetch(getSingleWorkoutQuery, {workoutId});

    return result;
  }

  async deleteWorkoutById(workoutId: string): Promise<boolean> {
    const result = Boolean(await this.adminClient.delete(workoutId));
    return result;
  }

  async createWorkout(
    workoutData: WorkoutDocument,
  ): Promise<SanityDocument<WorkoutDocument>> {
    const result = await this.adminClient.create(workoutData);
    return result;
  }

  async getExerciseById(id: string): Promise<SingleExerciseQueryResult> {
    const result = await this.client.fetch(singleExerciseQuery, {id});

    // Add image URL to single exercise
    return result ? this.addImageUrlToExercise(result) : null;
  }
}
