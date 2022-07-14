const { signUp } = require("../middlewares/index.js");
const authController = require("../controllers/auth.controller.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  /**
  * @swagger
  *  tags:
  *    name: Auth
  *    description: Auth API
  */

  /**
  * @swagger
  * /api/auth/signup:
  *   post:
  *     summary: signup new user
  *     tags: [Auth]
  *     parameters:
  *       - in: query
  *         name: email
  *         schema:
  *           type: string
  *         required: true
  *         description: user email
  *       - in: query
  *         name: username
  *         schema:
  *           type: string
  *         required: true
  *         description: user username
  *       - in: query
  *         name: password
  *         schema:
  *           type: string
  *         required: true
  *         description: user password
  *     responses:
  *       200:
  *         description: user successfully created
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *             example:
  *                message: success
  *       400:
  *         description: email or username already in use
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: email already in use
  *       500:
  *         description: internal server error
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: ""
  */
  app.post("/api/auth/signup", [signUp], authController.signup);

  /**
  * @swagger
  * /api/auth/signin:
  *   post:
  *     summary: signin as existing user
  *     tags: [Auth]
  *     parameters:
  *       - in: query
  *         name: username
  *         schema:
  *           type: string
  *         required: true
  *         description: user username
  *       - in: query
  *         name: password
  *         schema:
  *           type: string
  *         required: true
  *         description: user password
  *     responses:
  *       200:
  *         description: user successfully logged in
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *                 accessToken:
  *                   type: string
  *             example:
  *                message: success
  *                accessToken: jwt.access.token
  *       401:
  *         description: invalid password
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: invalid password
  *       403:
  *         description: user not found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: username not found
  *       500:
  *         description: internal server error
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: ""
  */
  app.post("/api/auth/signin", authController.signin);
};
