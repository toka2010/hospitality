import { Injectable } from '@nestjs/common';
import { ApiErrors } from './shared/api-error';

@Injectable()
export class AppService {
  getHello(): string {
 throw ApiErrors.BadRequest({message:"not allowed"})
  }
}
