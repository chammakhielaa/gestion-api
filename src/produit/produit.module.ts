
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
