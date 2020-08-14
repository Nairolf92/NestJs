import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes.module';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [RecipesModule],
  providers: [RecipesService],
  controllers: [RecipesController]
})
export class IngredientHttpModule {}
