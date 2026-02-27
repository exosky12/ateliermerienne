import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
	ALL: {
		'sign_up.execute': { paramsTuple?: []; params?: {} }
		'sign_in.execute': { paramsTuple?: []; params?: {} }
		'sign_out.execute': { paramsTuple?: []; params?: {} }
		'get_user.execute': { paramsTuple?: []; params?: {} }
	}
	POST: {
		'sign_up.execute': { paramsTuple?: []; params?: {} }
		'sign_in.execute': { paramsTuple?: []; params?: {} }
		'sign_out.execute': { paramsTuple?: []; params?: {} }
	}
	GET: {
		'get_user.execute': { paramsTuple?: []; params?: {} }
	}
	HEAD: {
		'get_user.execute': { paramsTuple?: []; params?: {} }
	}
}
declare module '@adonisjs/core/types/http' {
	export interface RoutesList extends ScannedRoutes {}
}
