// prints info and error logs

const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = { info, error }