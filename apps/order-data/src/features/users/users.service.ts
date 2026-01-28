import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return await this.usersRepository.createUser(
      createUserDto.email,
      createUserDto.password,
    );
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAllUsers();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // If email is being updated, check for conflicts
    if (
      updateUserDto.email &&
      updateUserDto.email !== user.email
    ) {
      const existingUser = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    return await this.usersRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const success = await this.usersRepository.deleteUser(id);
    if (!success) {
      throw new NotFoundException(`Failed to delete user with ID ${id}`);
    }
  }
}
