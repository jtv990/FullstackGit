// starts the app - program entry point
// connects to MongoDB
// calls app.listen()

// application boot

// index.js -> app.js -> middleware(requestLogger) -> blogs.js (route matches)
// -> blogs.js(database access) -> controller sends response -> middleware(error handling)

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
