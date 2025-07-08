import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { Model, ObjectId } from 'mongoose';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(filters: QueryUserDto) {
    const query: any = {};

    if (filters.role) {
      query.role = filters.role;
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
      ];
    }

    if (filters.department) {
      query.department = filters.department;
    }

    const rolesArray = await this.userModel.find(query);
    return rolesArray;
  }

  async findById(id: ObjectId) {
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

    // 🔐 Hash the password before saving
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 salt rounds
    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ Optionally remove password from response
    const { password, ...result } = newUser.toObject();
    return result;
  }

  async update(id: ObjectId, updateUser: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }
    return updatedUser;
  }

  async delete(id: ObjectId) {
    const removedUser = await this.userModel.findByIdAndDelete(id);

    return removedUser;
  }

  async toggleActiveStatus(id: ObjectId) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    user.isActive = !user.isActive;
    await user.save();

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
