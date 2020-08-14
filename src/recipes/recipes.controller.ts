import { Controller, Get, Post, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Recipe } from './recipe.entity';

@Controller('recipes')
export class RecipesController {
  constructor(private serv: RecipesService) { }

  @Get()
  getRecipes() {
    return this.serv.findAll();
  }

  @Post()
  createArticle(@Body() body: Recipe) {
    return this.serv.create(body);
  }
}
