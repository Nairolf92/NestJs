import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Ingredient } from './ingredients/ingredient.entity';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { Recipe } from './recipes/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'flo',
      password: 'flo',
      database: 'fablife',
      entities: [Ingredient, Recipe],
      synchronize: true,
      autoLoadEntities: true,
    }),
    IngredientsModule,
    RecipesModule
  ],
})

export class AppModule {
  constructor(private connection: Connection) {}
}