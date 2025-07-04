import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === parseInt(id));
    if (user) {
      return user;
    }
    console.log('000', id);
    throw new Error(`User with id ${id} not found`);
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
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

  update(
    id: string,
    updateUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === parseInt(id)) {
        return { ...user, ...updateUser };
      }
      return user;
    });

    return this.findById(id);
  }

  delete(id: string) {
    console.log('000', id);
    const removedUser = this.findById(id);

    this.users = this.users.filter((user) => user.id !== parseInt(id));

    return removedUser;
  }
}
