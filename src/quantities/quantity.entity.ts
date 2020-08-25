import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm/decorator/relations/JoinTable';
import { Recipe } from '../recipes/recipe.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity()
export class Quantity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unit: string;

  @Column()
  measure: number;

  @ManyToMany(type => Ingredient, {
    cascade : true
  })
  @JoinTable()
  ingredients: Ingredient[];
}