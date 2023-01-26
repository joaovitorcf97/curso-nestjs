import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { ParamId } from "src/decorators/param-id-decorator";
import { LogInterceptor } from "src/interceptors/log.interceptors";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatialUserDTO } from "./dto/update-partial-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() params) {
    return this.userService.show(params);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateUserDTO,
    @ParamId() params: number
  ) {
    return this.userService.update(data, params);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatialUserDTO,
    @ParamId() params: number
  ) {
    return this.userService.updatePartial(data, params);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.userService.delete(id);
  }
}