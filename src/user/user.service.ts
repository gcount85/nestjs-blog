import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  // `User` 엔터티 타입의 `Repository` 객체를 생성하여 userRepository 변수에 주입
  // 이 userRepository는 TypeORM의 기본 CRUD 작업을 수행하는 메소드를 제공
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Repository<Entity>
  ) {}

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async updateUser(
    email: string,
    updateUser: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update({ email: email }, updateUser);
  }

  async deleteUser(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email });
  }

  async findByEmailOrSave(email: string, username, providerId): Promise<User> {
    const foundUser = await this.getUser(email);
    if (foundUser) {
      return foundUser;
    }

    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });

    return newUser;
  }
}
