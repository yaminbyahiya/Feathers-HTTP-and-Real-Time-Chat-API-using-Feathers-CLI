import { message } from './messages/messages.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(message)

  app.configure(user)

  // All services will be registered here
}
