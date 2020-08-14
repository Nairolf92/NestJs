import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getRepository, Repository, UpdateResult } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { IngredientDTO } from './ingredient.dto';
import { Recipe } from '../recipes/recipe.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
    private connection: Connection
  ) {}


  create(ingredientDTO: IngredientDTO): Promise<Ingredient> {
    const ingredient = new Ingredient();
    ingredient.name= ingredientDTO.name;
    ingredient.aisle= ingredientDTO.aisle;

    return this.ingredientsRepository.save(ingredient);
  }

  // TODO : DOESN'T WORK YET
  async update(id: string, ingredient: Ingredient): Promise<Ingredient> {
    return await this.ingredientsRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsRepository.find();
  }

  findOne(id: string): Promise<Ingredient> {
    return this.ingredientsRepository.findOne(id);
  }

  // TODO : Check if relations in jointables exists, if so remove it and then remove the ingredient
  // https://typeorm.io/#/many-to-many-relations/deleting-many-to-many-relations
  async remove(id: string): Promise<void> {
    await this.ingredientsRepository.delete(id);
  }
}