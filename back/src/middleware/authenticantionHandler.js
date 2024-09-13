const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const User = prisma.user;

function authenticationHandler(allowedRoles = []) {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'You must be logged to access.' });
    }

    const [, token] = authorization.split(' ');

    try {
      const { id, name } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findUnique({ where: { id }, select: { role: true } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid token.' });
      }

      const userRole = user.role;

      if (allowedRoles.includes(userRole)) {
        req.userId = id;
        req.name = name;
        req.userRole = userRole;
        return next;
      } else {
        return res.status(403).json({ message: 'Token expired or invalid' });
      }
    } catch (error) {}
  };
}

module.exports = authenticationHandler;
