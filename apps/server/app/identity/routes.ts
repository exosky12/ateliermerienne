import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'

router.group(() => {
	router.post('sign_up', [controllers.identity.SignUp, 'execute'])
	router.post('sign_in', [controllers.identity.SignIn, 'execute'])
	router.post('sign_out', [controllers.identity.SignOut, 'execute'])
})

router.group(() => {
	router.get('get_user', [controllers.identity.GetUser, 'execute'])
})
/**
 * TODO: modifier get_user. C'est pas une action c'est une query.
 */
