import { HttpContext } from '@adonisjs/core/http';
import { BaseSerializer } from '@adonisjs/core/transformers';
class ApiSerializer extends BaseSerializer {
    wrap = 'data';
    definePaginationMetaData(metaData) {
        if (!this.isLucidPaginatorMetaData(metaData)) {
            throw new Error('Invalid pagination metadata. Expected metadata to contain Lucid pagination keys');
        }
        return metaData;
    }
}
const serializer = new ApiSerializer();
const serialize = Object.assign(function (...[data, resolver]) {
    return serializer.serialize(data, resolver ?? this.containerResolver);
}, {
    withoutWrapping(...[data, resolver]) {
        return serializer.serializeWithoutWrapping(data, resolver ?? this.containerResolver);
    },
});
HttpContext.instanceProperty('serialize', serialize);
//# sourceMappingURL=api_provider.js.map