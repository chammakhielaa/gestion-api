
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ProduitService } from './produit.service';
import { Produit } from './entities/produit.entity';

@Controller('produits')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  createProduit(@Body() data: Partial<Produit>) {
    return this.produitService.createProduit(data);
  }

  @Get()
  getProduits() {
    return this.produitService.getProduits();
  }

  @Get(':id')
  getProduitById(@Param('id', ParseIntPipe) id: number) {
    return this.produitService.getProduitById(id);
  }

  @Put(':id')
  updateProduit(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Produit>,
  ) {
    return this.produitService.updateProduit(id, data);
  }

  @Delete(':id')
  deleteProduit(@Param('id', ParseIntPipe) id: number) {
    return this.produitService.deleteProduit(id);
  }
}
