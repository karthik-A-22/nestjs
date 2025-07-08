import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() QueryUserDto: QueryUserDto) {
    return this.UsersService.findAll(QueryUserDto);
  }

  @Get(':id')
  findById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.UsersService.findById(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.UsersService.create(user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(ValidationPipe)
    updateUser: UpdateUserDto,
  ) {
    return this.UsersService.update(id, updateUser);
  }

  @Patch(':id/toggle-active')
  toggleActiveStatus(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.UsersService.toggleActiveStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.UsersService.delete(id);
  }
}
