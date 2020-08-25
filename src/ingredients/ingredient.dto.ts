import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Recipe } from '../recipes/recipe.entity';

@Entity()
export class IngredientDTO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  aisle: number;

  @ManyToMany(type => Recipe, recipe => recipe.ingredients)
  @JoinTable()
  recipes: Recipe[];
}