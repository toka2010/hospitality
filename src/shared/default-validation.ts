
import {
  ArgumentMetadata,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ApiErrors } from './api-error';

export class DefaultValidationPipe extends ValidationPipe {
  constructor(overwriteDefaultOptions: ValidationPipeOptions = {}) {
    super({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      validationError: { target: false },
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors: ValidationError[]) => {
        const args = { param: [] as any, message: [] as any };
        transformErrors(args, errors);
        return ApiErrors.UnProcessableEntity(args);
      },
      ...overwriteDefaultOptions,
    });
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<void> {
    if (metadata.metatype && (metadata.metatype as any).transformer) {
      value = (metadata.metatype as any).transformer(value);
    }

    return await super.transform(value, metadata);
  }
}

function transformErrors(
  args: { param: any[]; message: any[] },
  errors: ValidationError[],
  parentProperty = '',
) {
  for (const error of errors) {
    const property = parentProperty
      ? `${parentProperty}.${error.property}`
      : error.property;
    if (error.constraints) {
      args.message.push(error.constraints);
      args.param.push(property);
    }
    if (error.children && error.children.length > 0) {
      transformErrors(args, error.children, property);
    }
  }
}
