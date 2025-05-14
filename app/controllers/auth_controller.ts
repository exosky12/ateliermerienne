import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class AuthController {
  public async google({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  public async googleCallback({ ally, auth, response }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (google.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()

    const user = await User.firstOrCreate(
      {
        email: googleUser.email,
      },
      {
        fullName: googleUser.name,
      }
    )

    await auth.use('web').login(user)
    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }

  public async facebook({ ally }: HttpContext) {
    return ally.use('facebook').redirect()
  }

  public async facebookCallback({ ally, auth, response }: HttpContext) {
    const facebook = ally.use('facebook')

    if (facebook.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (facebook.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    if (facebook.hasError()) {
      return facebook.getError()
    }

    const facebookUser = await facebook.user()

    const user = await User.firstOrCreate(
      {
        email: facebookUser.email,
      },
      {
        fullName: facebookUser.name,
      }
    )

    await auth.use('web').login(user)
    return response.redirect('/')
  }
}
