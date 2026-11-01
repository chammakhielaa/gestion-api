
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create
  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  // Read all
  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Read by ID
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `Utilisateur avec l'identifiant ${id} introuvable`,
      );
    }

    return user;
  }

  // Update
  async updateUser(
    id: number,
    data: Partial<User>,
  ): Promise<User> {
    const user = await this.getUserById(id);

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  // Delete
  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.getUserById(id);

    await this.userRepository.remove(user);

    return {
      message: `Utilisateur ${id} supprimé avec succès`,
    };
  }
}
