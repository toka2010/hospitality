import { ArgumentMetadata, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
export declare class DefaultValidationPipe extends ValidationPipe {
    constructor(overwriteDefaultOptions?: ValidationPipeOptions);
    transform(value: any, metadata: ArgumentMetadata): Promise<void>;
}
