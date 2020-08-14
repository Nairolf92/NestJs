import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToMany(type => Ingredient, {
      cascade : true
    })
  @JoinTable()
  ingredients: Ingredient[];

  @Column()
  instructions : string;
}