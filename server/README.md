# FitBuild Backend

A NestJS API backend for the FitBuild fitness application with Sanity CMS integration and AI-powered exercise instructions via OpenRouter.

## Features

- **Sanity CMS Integration**: Read operations for exercises
- **AI-Powered Exercise Instructions**: Get detailed instructions for any exercise via OpenRouter
- **TypeScript**: Fully typed API responses and requests
- **CORS Enabled**: Ready for cross-origin requests from mobile apps
- **Health Check**: Built-in health monitoring endpoint
- **Modular Architecture**: Clean separation of concerns with NestJS modules
- **Environment Configuration**: Centralized configuration with validation

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Sanity CMS** - Headless CMS for content management
- **OpenRouter** - AI model access via OpenAI API
- **Express** - HTTP server (via NestJS)
- **@nestjs/config** - Environment configuration management

## Project Structure

```
src/
├── config/                # Configuration files
│   ├── configuration.ts   # Environment configuration
│   └── env.validation.ts  # Environment validation
├── controllers/           # API route handlers
│   ├── exercises.controller.ts
│   ├── ai.controller.ts
│   └── health.controller.ts
├── services/             # Business logic
│   ├── sanity.service.ts
│   └── ai.service.ts
├── modules/              # Feature modules
│   ├── exercises.module.ts
│   ├── ai.module.ts
│   └── health.module.ts
├── types/                # TypeScript type definitions
│   ├── sanity.ts
│   ├── ai.ts
│   ├── api.ts
│   └── index.ts
├── dto/                  # Data Transfer Objects
│   └── exercise-instructions.dto.ts
├── app.module.ts         # Main application module
└── main.ts              # Application entry point
```

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `env.example` to `.env` and fill in your API keys:
   ```bash
   cp env.example .env
   ```

3. **Required Environment Variables**
   ```env
   # Environment
   NODE_ENV=development
   PORT=3000

   # CORS Configuration
   CORS_ORIGIN=true

   # Sanity Configuration
   SANITY_PROJECT_ID=your_sanity_project_id
   SANITY_DATASET=production
   SANITY_API_TOKEN=your_sanity_api_token

   # AI Model API Keys
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Run Development Server**
   ```bash
   npm run start:dev
   ```

## Environment Configuration

The application uses `@nestjs/config` for centralized configuration management:

- **Automatic Validation**: All required environment variables are validated on startup
- **Type Safety**: Configuration is fully typed
- **Centralized**: All configuration is managed in one place
- **Environment Specific**: Different configurations for development/production

### Configuration Structure

```typescript
{
  port: 3000,
  nodeEnv: 'development',
  sanity: {
    projectId: 'your-project-id',
    dataset: 'production',
    apiToken: 'your-token',
    apiVersion: '2025-02-06'
  },
  ai: {
    openRouterApiKey: 'your-key',
    defaultModel: 'openai/gpt-oss-20b:free',
    baseURL: 'https://openrouter.ai/api/v1'
  },
  cors: {
    origin: true,
    credentials: true
  }
}
```

## API Endpoints

### Health Check
- `GET /api/health` - Check backend status

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/:id` - Get specific exercise by ID

### AI Services
- `POST /api/ai/exercise-instructions` - Get detailed exercise instructions

## API Usage

### Get All Exercises
```bash
GET /api/exercises
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "exercise-id",
      "name": "Push-ups",
      "_type": "exercise",
      "description": "A bodyweight exercise...",
      "exerciseImage": { ... },
      "videoUrl": "https://...",
      "difficultyLevel": "beginner",
      "isActive": true
    }
  ]
}
```

### Get Exercise by ID
```bash
GET /api/exercises/exercise-id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "exercise-id",
    "_type": "exercise",
    "_createdAt": "2025-01-01T00:00:00Z",
    "_updatedAt": "2025-01-01T00:00:00Z",
    "_rev": "rev-id",
    "name": "Push-ups",
    "description": "A bodyweight exercise...",
    "difficultyLevel": "beginner",
    "exerciseImage": { ... },
    "videoUrl": "https://...",
    "isActive": true
  }
}
```

### Get Exercise Instructions
```bash
POST /api/ai/exercise-instructions
Content-Type: application/json

{
  "exerciseName": "push-ups"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "instructions": "Detailed exercise instructions..."
  },
  "message": "Exercise instructions generated successfully"
}
```

**Instructions include:**
- Step-by-step instructions
- Proper body positioning and form
- Safety precautions and common mistakes
- Muscle groups targeted
- Equipment needed
- Modifications for different fitness levels
- Breathing technique

## Development

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

### Code Structure

The application follows NestJS best practices:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and external API calls
- **Modules**: Organize related functionality
- **DTOs**: Define request/response data structures
- **Types**: TypeScript type definitions
- **Configuration**: Centralized environment management

### Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Optional additional info"
}
```

## Deployment

### Local Production Build
```bash
npm run build
npm run start:prod
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Environment Variables for Production
Make sure to set all required environment variables in your production environment. The application will validate them on startup and fail fast if any are missing.

## CORS

CORS is configured through environment variables. In production, you should set `CORS_ORIGIN` to your specific domain(s) instead of `true`.

## Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Update types when adding new endpoints
4. Test with different AI models
5. Follow NestJS conventions
6. Update configuration when adding new environment variables

## License

This project is private and proprietary.
