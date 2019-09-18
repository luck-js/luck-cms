'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/configurations/configurations.html#bootstrap
 */

module.exports = async () => {
  const admins = process.env.ADMINS ? JSON.parse(process.env.ADMINS) : []
  await admins.forEach(async ({ username, password, email }) => {
  console.log(username, password, email )
    strapi.log.info("Bootstrapping Admin")

    if (!username || !password || !email) {
      return
    }
    await initAdmin({ username, password, email })
  })
}

async function initAdmin({ username, password, email }) {
  const adminOrm = strapi.query("administrator", "admin")
  const admins = await adminOrm.find({ username })

  if (admins.length === 0) {
    const blocked = false
    const hashedPassword = await strapi.admin.services.auth.hashPassword(
      password
    )
    const user = { blocked, username, email, password: hashedPassword }

    await adminOrm.create(user)

    strapi.log.warn(`Bootstrapped Admin: ${JSON.stringify(user)}`)
  }
}
