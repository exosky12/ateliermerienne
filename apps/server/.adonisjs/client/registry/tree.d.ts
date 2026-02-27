/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
	signUp: {
		execute: (typeof routes)['sign_up.execute']
	}
	signIn: {
		execute: (typeof routes)['sign_in.execute']
	}
	signOut: {
		execute: (typeof routes)['sign_out.execute']
	}
	getUser: {
		execute: (typeof routes)['get_user.execute']
	}
}
