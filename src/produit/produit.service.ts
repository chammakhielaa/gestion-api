
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private produitRepository: Repository<Produit>,
  ) {}

  // Create
  async createProduit(data: Partial<Produit>): Promise<Produit> {
    const produit = this.produitRepository.create(data);
    return this.produitRepository.save(produit);
  }

  // Read all
  async getProduits(): Promise<Produit[]> {
    return this.produitRepository.find();
  }

  // Read by ID
  async getProduitById(id: number): Promise<Produit> {
    const produit = await this.produitRepository.findOneBy({ id });

    if (!produit) {
      throw new NotFoundException(
        `Produit avec l'identifiant ${id} introuvable`,
      );
    }

    return produit;
  }

  // Update
  async updateProduit(
    id: number,
    data: Partial<Produit>,
  ): Promise<Produit> {
    const produit = await this.getProduitById(id);

    Object.assign(produit, data);

    return this.produitRepository.save(produit);
  }

  // Delete
  async deleteProduit(id: number): Promise<{ message: string }> {
    const produit = await this.getProduitById(id);

    await this.produitRepository.remove(produit);

    return {
      message: `Produit ${id} supprimé avec succès`,
    };
  }
}
