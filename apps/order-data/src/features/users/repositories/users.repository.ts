import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({
      where: { email },
    });
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = this.create({
      email,
      password,
    });
    return await this.save(user);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.update(id, data);
    return await this.findOne({
      where: { id },
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.delete(id);
    return result.affected > 0;
  }

  async findAllUsers(): Promise<User[]> {
    return await this.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.findOne({
      where: { id },
    });
  }
}
