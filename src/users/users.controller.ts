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

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return [role];
  }

  @Get('interns')
  findInterns() {
    return [];
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: {}) {
    return { user, message: 'User created successfully.' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: {}) {
    return {
      data: { id, ...updateUser },
      message: 'User updated successfully.',
    };
  }

  @Delete(':id')
  delete(@Param(':id') id: string) {
    return { id, message: 'User deleted' };
  }
}
