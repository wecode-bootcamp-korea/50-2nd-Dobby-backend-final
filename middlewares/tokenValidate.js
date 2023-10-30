// 아직 router로 연결하지 않았다.(주석 처리하였다).
const { throwErr } = require("../entity/utils");
const { existingUser } = require("../services/userService")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env

const tokenValidation = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const { id } = jwt.verify(token, SECRET_KEY) // token 검증

        const foundUser = await existingUser({ id })
        if (!foundUser) // 이 토큰을 가진 유저가 데이터베이스에 없으면 404 에러를 냅니다.
            throwErr({ statusCode: 404, message: 'USER NOT FOUND' })

        req.foundUser = foundUser // r45 66 uynhji9j nb8 0
        // req.foundUser에서 id를 확인 가능(request 수신 이후)
        next() // 기다렸다가 넘어가게 한다.
    } catch (err) {
        next(err)
    }
}

module.exports = { tokenValidation }