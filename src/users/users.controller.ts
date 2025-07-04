import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.UsersService.findAll(role);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.UsersService.findById(id);
  }

  @Post()
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.UsersService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.UsersService.update(id, updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log('000', id);
    return this.UsersService.delete(id);
  }
}
