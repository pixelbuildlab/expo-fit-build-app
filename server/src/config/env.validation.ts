import {plainToClass} from 'class-transformer';
import {IsString, IsNotEmpty, validateSync} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  SANITY_PROJECT_ID: string;

  @IsString()
  @IsNotEmpty()
  SANITY_DATASET: string;

  @IsString()
  @IsNotEmpty()
  SANITY_API_TOKEN: string;

  @IsString()
  @IsNotEmpty()
  OPENROUTER_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
