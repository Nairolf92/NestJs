import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm/decorator/relations/JoinTable';
import { Recipe } from '../recipes/recipe.entity';

@Entity()
export class Ingredient {
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