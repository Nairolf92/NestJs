import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Ingredient } from './ingredient.entity';
import { IngredientDTO } from './ingredient.dto';
import { DeleteResult } from 'typeorm';

@Controller('ingredients')
export class IngredientsController {
  constructor(private serv: IngredientsService) { }

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.serv.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.serv.findOne(id);
  }

  @Post()
  create(@Body() ingredientDTO: IngredientDTO): Promise<Ingredient> {
    return this.serv.create(ingredientDTO);
  }

  @Put()
  update(@Body() ingredientDTO: IngredientDTO, @Param('id')id): Promise<Ingredient> {
    return this.serv.update(id, ingredientDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.serv.remove(id);
  }
}
