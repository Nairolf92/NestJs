import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}


  create(recipe: Recipe): Promise<Recipe> {
    return this.recipesRepository.save(recipe);
  }

  async update(recipe: Recipe) {
    const oldRecipe = await getConnection().manager.findOne(Recipe, recipe.id);
    console.log(oldRecipe);
    if(oldRecipe.name === recipe.name) {
      return await this.recipesRepository.save(recipe);
    } else {
      return "BAZINGA";
    }
  }

  findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find();
  }

  findOne(id: string): Promise<Recipe> {
    return this.recipesRepository.findOne(id);
  }

  async remove(recipeId: string): Promise<DeleteResult> {

    const recipe = await getConnection().manager.findOne(Recipe, recipeId);
    console.log(recipe);

    if(recipe) {
      recipe.ingredients = await getConnection()
        .createQueryBuilder()
        .relation(Recipe, "ingredients")
        .of(recipe)
        .loadMany();
      console.log(recipe);

      if (Array.isArray(recipe.ingredients) && recipe.ingredients.length) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Conflict',
        }, HttpStatus.CONFLICT);
      } else {
        return this.recipesRepository.delete(recipeId);
      }
    } else {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
    }
  }
}