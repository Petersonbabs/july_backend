const middleware2 = (req, res, next) => {
    if (9 < 9) {
        return res.status(400).json({
            message: "Middleware 2 returned a response"
        })
    }

    req.middleware2 = "MIDDLEWARE 2 BODY"
    next()
}

module.exports = middleware2