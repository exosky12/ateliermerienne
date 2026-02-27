/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
	'sign_up.execute': {
		methods: ['POST'],
		pattern: '/sign_up',
		tokens: [{ old: '/sign_up', type: 0, val: 'sign_up', end: '' }],
		types: placeholder as Registry['sign_up.execute']['types'],
	},
	'sign_in.execute': {
		methods: ['POST'],
		pattern: '/sign_in',
		tokens: [{ old: '/sign_in', type: 0, val: 'sign_in', end: '' }],
		types: placeholder as Registry['sign_in.execute']['types'],
	},
	'sign_out.execute': {
		methods: ['POST'],
		pattern: '/sign_out',
		tokens: [{ old: '/sign_out', type: 0, val: 'sign_out', end: '' }],
		types: placeholder as Registry['sign_out.execute']['types'],
	},
	'get_user.execute': {
		methods: ['GET', 'HEAD'],
		pattern: '/get_user',
		tokens: [{ old: '/get_user', type: 0, val: 'get_user', end: '' }],
		types: placeholder as Registry['get_user.execute']['types'],
	},
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
	routes,
	$tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
	export interface UserRegistry {
		routes: typeof routes
		$tree: ApiDefinition
	}
}
