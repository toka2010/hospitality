import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class ImageInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
    uploadImageToStorage(file: any): Promise<unknown>;
}
