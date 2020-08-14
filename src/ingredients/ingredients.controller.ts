import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Ingredient } from './ingredient.entity';
import { IngredientDTO } from './ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private serv: IngredientsService) { }

  @Post()
  create(@Body() ingredientDTO: IngredientDTO): Promise<Ingredient> {
    return this.serv.create(ingredientDTO);
  }

  @Put()
  update(@Body() ingredientDTO: IngredientDTO, @Param('id')id): Promise<Ingredient> {
    return this.serv.update(id, ingredientDTO);
  }

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.serv.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.serv.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.serv.remove(id);
  }
}
