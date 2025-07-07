import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie Lee',
      email: 'charlie.lee@example.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Diana Cruz',
      email: 'diana.cruz@example.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Ethan Wright',
      email: 'ethan.wright@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0) {
        throw new NotFoundException(`No users found with role ${role}`);
      }
      return rolesArray;
    }
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  create(user: CreateUserDto) {
    const existingUser = this.users.find((u) => user.email === u.email);
    if (existingUser) {
      throw new Error(`User with email ${user.email} already exists`);
    }
    const userHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });

    return this.findById(id);
  }

  delete(id: number) {
    const removedUser = this.findById(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
