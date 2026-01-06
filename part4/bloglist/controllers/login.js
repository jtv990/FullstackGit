const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordOK = user === null ? false : await bcrypt.compare(
        password, user.passwordHash)
    
    if (!(user && passwordOK)){
        return response.status(401).json({
            error: 'wrong username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 100}
    )

    response.status(200).send({
        token,
        username: user.username,
        name: user.name,
    })
})

module.exports = loginRouter