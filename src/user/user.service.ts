import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatialUserDTO } from "./dto/update-partial-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ email, name, password }: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    return this.prisma.user.create({
      data: {
        email, name, password,
      }
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async update({ email, name, password, birth_at, role }: UpdateUserDTO, id: number) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birth_at: birth_at ? new Date(birth_at) : null,
        role
      },
      where: { id }
    });
  }

  async updatePartial({ email, name, password, birth_at, role }: UpdatePatialUserDTO, id: number) {
    await this.exists(id);
    const data: any = {};

    if (birth_at) {
      data.birth_at = new Date(birth_at);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = password;

      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data: data,
      where: { id }
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({
      where: { id }
    });
  }

  async exists(id: number) {
    if (!(await this.prisma.user.count({
      where: { id }
    }))) {
      throw new NotFoundException('O usuario não existe');
    }
  }
}