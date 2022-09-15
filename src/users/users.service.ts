import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    if (id == null) return null;
    
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  find(email: string) {
    return this.repo.find({
      where: {
        email,
      },
    });
  }

  async update(id: number, params: Partial<UserEntity>) {
    const user = await this.findOne(id);

    if (user == null) {
        throw new NotFoundException("User not fount")
    }

    Object.assign(user, params);
    
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user == null) {
        throw new NotFoundException("User not fount")
    }

    return this.repo.remove(user)
  }
}
