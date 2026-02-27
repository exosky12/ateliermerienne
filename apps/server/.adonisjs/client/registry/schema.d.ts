/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type {
	ExtractBody,
	ExtractQuery,
	ExtractQueryForGet,
	ExtractResponse,
} from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
	'sign_up.execute': {
		methods: ['POST']
		pattern: '/sign_up'
		types: {
			body: ExtractBody<
				InferInput<
					(typeof import('#app/identity/controllers/sign_up_controller').default)['validator']
				>
			>
			paramsTuple: []
			params: {}
			query: ExtractQuery<
				InferInput<
					(typeof import('#app/identity/controllers/sign_up_controller').default)['validator']
				>
			>
			response: ExtractResponse<
				Awaited<
					ReturnType<import('#app/identity/controllers/sign_up_controller').default['execute']>
				>
			>
		}
	}
	'sign_in.execute': {
		methods: ['POST']
		pattern: '/sign_in'
		types: {
			body: ExtractBody<
				InferInput<
					(typeof import('#app/identity/controllers/sign_in_controller').default)['validator']
				>
			>
			paramsTuple: []
			params: {}
			query: ExtractQuery<
				InferInput<
					(typeof import('#app/identity/controllers/sign_in_controller').default)['validator']
				>
			>
			response: ExtractResponse<
				Awaited<
					ReturnType<import('#app/identity/controllers/sign_in_controller').default['execute']>
				>
			>
		}
	}
	'sign_out.execute': {
		methods: ['POST']
		pattern: '/sign_out'
		types: {
			body: {}
			paramsTuple: []
			params: {}
			query: {}
			response: ExtractResponse<
				Awaited<
					ReturnType<import('#app/identity/controllers/sign_out_controller').default['execute']>
				>
			>
		}
	}
	'get_user.execute': {
		methods: ['GET', 'HEAD']
		pattern: '/get_user'
		types: {
			body: {}
			paramsTuple: []
			params: {}
			query: {}
			response: ExtractResponse<
				Awaited<
					ReturnType<import('#app/identity/controllers/get_user_controller').default['execute']>
				>
			>
		}
	}
}
