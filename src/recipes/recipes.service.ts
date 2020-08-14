import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find();
  }

  findOne(id: string): Promise<Recipe> {
    return this.recipesRepository.findOne(id);
  }

  // Check if relations in jointables exists, if so remove it and then remove the recipe
  async remove(id: string): Promise<void> {
    await this.recipesRepository.delete(id);
  }
}