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
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { QueryUserDto } from './dtos/query-user.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  findAll(@Query() QueryUserDto: QueryUserDto) {
    return this.UsersService.findAll(QueryUserDto);
  }

  @Get(':id')
  findById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.UsersService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.UsersService.create(user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(ValidationPipe)
    updateUser: UpdateUserDto,
  ) {
    return this.UsersService.update(id, updateUser);
  }

  @Patch(':id/toggle-active')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  toggleActiveStatus(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.UsersService.toggleActiveStatus(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  delete(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.UsersService.delete(id);
  }
}
