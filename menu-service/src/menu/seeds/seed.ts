import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from '../../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }

  await app.close();
}

bootstrap(); 