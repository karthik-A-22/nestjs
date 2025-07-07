import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    const query = role ? { role } : {};
    const rolesArray = await this.userModel.find(query);
    return rolesArray;
  }

  async findById(id: number) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new Error(`User already exists`);
    }
    const newUser = new this.userModel(user);
    await newUser.save();

    return newUser;
  }

  async update(id: number, updateUser: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }
    return updatedUser;
  }

  delete(id: number) {
    const removedUser = this.userModel.findByIdAndDelete(id);

    return removedUser;
  }
}
