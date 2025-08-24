import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import OpenAI from 'openai';
import type {AIRequest, AIResponse} from '../types/ai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      baseURL: this.configService.get<string>('ai.baseURL'),
      apiKey: this.configService.get<string>('ai.openRouterApiKey'),
    });
  }

  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const {
      prompt,
      systemPrompt,
      model = this.configService.get<string>('ai.defaultModel'),
      temperature = 0.7,
      maxTokens = 4096,
    } = request;

    try {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

      if (systemPrompt) {
        messages.push({role: 'system', content: systemPrompt});
      }

      messages.push({role: 'user', content: prompt});

      const completion = await this.openai.chat.completions.create({
        model: model!,
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      return {
        content: completion.choices[0]?.message?.content || '',
        model: model!,
        usage: completion.usage
          ? {
              promptTokens: completion.usage.prompt_tokens,
              completionTokens: completion.usage.completion_tokens,
              totalTokens: completion.usage.total_tokens,
            }
          : undefined,
      };
    } catch (error) {
      console.error(`AI Service Error:`, error);
      return {
        content: '',
        model: model!,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getExerciseInstructions(exerciseName: string): Promise<string> {
    const systemPrompt = `You are a certified fitness trainer and exercise expert.`;

    const userPrompt = `You are given an exercise, provide clear instructions on how to perform the exercise.
                        Include if any equipment is required.
                        Explain the exercise in detail and for a beginner.
                        The exercise name is ${exerciseName}.
                        
                        Keep it short and concise.
                        Always use markdown format for output.
                        Do not use raw HTML tags like <br>.

                        Use following format:

                        ## Equipment Required

                        ## Instructions

                        ### Tips

                        ### Variations

                        ### Safety

                        additional notes: 
                        keep spacing between the headings and content.
                        Always use headings and subheadings.
                        `;

    const response = await this.generateResponse({
      prompt: userPrompt,
      systemPrompt,
      model: this.configService.get<string>('ai.defaultModel'),
      temperature: 0.5,
    });

    return response.content;
  }
}
