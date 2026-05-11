import { BaseSerializer } from '@adonisjs/core/transformers';
import { type SimplePaginatorMetaKeys } from '@adonisjs/lucid/types/querybuilder';
declare class ApiSerializer extends BaseSerializer<{
    Wrap: 'data';
    PaginationMetaData: SimplePaginatorMetaKeys;
}> {
    wrap: 'data';
    definePaginationMetaData(metaData: unknown): SimplePaginatorMetaKeys;
}
declare const serialize: ApiSerializer['serialize'] & {
    withoutWrapping: ApiSerializer['serializeWithoutWrapping'];
};
declare module '@adonisjs/core/http' {
    interface HttpContext {
        serialize: typeof serialize;
    }
}
export {};
