import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { email, name, password }: CreateUserDTO) {
    return { email, name, password };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) params) {
    return { params };
  }

  @Put(':id')
  async update(@Body() { email, name, password }: UpdateUserDTO, @Param('id', ParseIntPipe) params) {
    return {
      method: 'Put',
      user: { email, name, password },
      params,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() { email, name, password }: UpdateUserDTO, @Param('id', ParseIntPipe) params) {
    return {
      method: 'Patch',
      user: { email, name, password },
      params,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return {
      id,
    };
  }
}