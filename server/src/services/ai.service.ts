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
    const systemPrompt = `You are a certified fitness trainer and exercise expert. Provide detailed, accurate, and safe exercise instructions. Always include proper form, safety precautions, and modifications when applicable.`;

    const userPrompt = `Provide detailed instructions for the exercise "${exerciseName}". Include:

1. **How to perform the exercise step-by-step**
2. **Proper body positioning and form**
3. **Safety precautions and common mistakes to avoid**
4. **Muscle groups targeted**
5. **Equipment needed (if any)**
6. **Modifications for different fitness levels**
7. **Breathing technique**

Format your response in a clear, structured manner that's easy to follow.`;

    const response = await this.generateResponse({
      prompt: userPrompt,
      systemPrompt,
      model: this.configService.get<string>('ai.defaultModel'),
      temperature: 0.5,
    });

    return response.content;
  }
}
