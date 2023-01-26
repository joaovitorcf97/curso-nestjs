import { BadRequestException, NestMiddleware } from "@nestjs/common";

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {

    console.log('UserIdCheckMiddleware', 'antes');
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido!');
    }

    console.log('UserIdCheckMiddleware', 'depois');
    next();
  }

}