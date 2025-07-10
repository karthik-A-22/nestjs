import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { QueryUserDto } from './dtos/query-user.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

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

    const rolesArray = await this.userModel.find(query).populate('settings');
    return rolesArray;
  }

  async findById(id: ObjectId) {
    const user = await this.userModel.findById(id).populate('settings').exec();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async create({ settings, ...user }: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    let settingsId: Types.ObjectId | undefined = undefined;
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      settingsId = savedNewSettings._id;
    }

    const newUser = new this.userModel({
      ...user,
      password: hashedPassword,
      settings: settingsId,
    });

    return newUser.save();
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
