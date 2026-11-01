
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number;

  @Column()
  description: string;
}
