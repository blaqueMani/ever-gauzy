import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LanguagesEnum } from '@leano/contracts';

export const LanguageDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const headers = request.headers;
        return headers['language'] || LanguagesEnum.ENGLISH;
    }
);