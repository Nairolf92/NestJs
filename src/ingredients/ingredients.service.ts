import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { IngredientDTO } from './ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>
  ) {}


  create(ingredientDTO: IngredientDTO): Promise<Ingredient> {
    const ingredient = new Ingredient();
    ingredient.name= ingredientDTO.name;
    ingredient.aisle= ingredientDTO.aisle;

    return this.ingredientsRepository.save(ingredient);
  }

  async update(id: string, ingredient: Ingredient): Promise<Ingredient> {
    return await this.ingredientsRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsRepository.find();
  }

  findOne(id: string): Promise<Ingredient> {
    return this.ingredientsRepository.findOne(id);
  }

  // https://typeorm.io/#/many-to-many-relations/deleting-many-to-many-relations
  async remove(ingredientId: string): Promise<DeleteResult> {

    const ingredient = await getConnection().manager.findOne(Ingredient, ingredientId);
    console.log(ingredient);

    if(ingredient) {
      ingredient.recipes = await getConnection()
        .createQueryBuilder()
        .relation(Ingredient, "recipes")
        .of(ingredient)
        .loadMany();
      console.log(ingredient);

      if (Array.isArray(ingredient.recipes) && ingredient.recipes.length) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Conflict',
        }, HttpStatus.CONFLICT);
      } else {
        return this.ingredientsRepository.delete(ingredientId);
      }
    } else {
      throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND)
    }
  }
}