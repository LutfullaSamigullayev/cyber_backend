import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!data) return user;
    // Support nested access like "profile.id"
    return data.split(".").reduce((acc, key) => acc?.[key], user);
  },
);
