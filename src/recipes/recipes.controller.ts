import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Recipe } from './recipe.entity';
import { DeleteResult } from 'typeorm';
import { RecipeDTO } from './recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private serv: RecipesService) { }

  @Get()
  findAll() {
    return this.serv.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recipe> {
    return this.serv.findOne(id);
  }

  @Post()
  create(@Body() recipeDTO: RecipeDTO): Promise<Recipe> {
    return this.serv.create(recipeDTO);
  }

  @Put()
  update(@Body() recipeDTO: RecipeDTO){
    return this.serv.update(recipeDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.serv.remove(id);
  }
}
