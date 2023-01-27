import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ParamId } from "src/decorators/param-id-decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatialUserDTO } from "./dto/update-partial-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

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