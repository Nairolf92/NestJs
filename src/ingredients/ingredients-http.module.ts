import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients.module';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';

@Module({
  imports: [IngredientsModule],
  providers: [IngredientsService],
  controllers: [IngredientsController]
})
export class IngredientHttpModule {}
