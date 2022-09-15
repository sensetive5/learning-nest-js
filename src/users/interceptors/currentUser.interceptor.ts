import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor (private userService: UsersService) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        const userId = request?.session?.userId;

        if (userId) {
            const foundUser = await this.userService.findOne(userId);

            request.currentUser = foundUser;
        }

        return next.handle();
    }
}
