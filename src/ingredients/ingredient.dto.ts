import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IngredientDTO{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  aisle: number;
}