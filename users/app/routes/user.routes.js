const userController = require("../controllers/user.controller.js");
const { verifyToken } = require("../middlewares/index.js");

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
  *    name: User
  *    description: User API
  */

  /**
  * @swagger
  * /api/user:
  *   put:
  *     summary: change user's email
  *     tags: [User]
  *     parameters:
  *       - in: query
  *         name: email
  *         schema:
  *           type: string
  *         required: true
  *         description: user email
  *       - in: header
  *         name: x-access-token
  *         required: true
  *         description: jwt access token
  *     responses:
  *       200:
  *         description: email successfully changed
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *             example:
  *                message: success
  *       401:
  *         description: missing or invalid jwt token
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             examples:
  *               missing:
  *                 value:
  *                   error: "missing token"
  *               invalid:
  *                 value:
  *                   error: "invalid token"
  *       403:
  *         description: attempt to modify another user's account
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: not an owner
  *       404:
  *         description: user not found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: not found
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
  app.put("/api/user", [verifyToken], userController.update);

  /**
  * @swagger
  * /api/user:
  *   delete:
  *     summary: delete user
  *     tags: [User]
  *     parameters:
  *       - in: header
  *         name: x-access-token
  *         required: true
  *         description: jwt access token
  *     responses:
  *       200:
  *         description: used successfully deleted
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *             example:
  *                message: success
  *       401:
  *         description: missing or invalid jwt token
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             examples:
  *               missing:
  *                 value:
  *                   error: "missing token"
  *               invalid:
  *                 value:
  *                   error: "invalid token"
  *       403:
  *         description: attempt to delete another user's account
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: not an owner
  *       404:
  *         description: user not found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: not found
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
  app.delete("/api/user", [verifyToken], userController.delete);
};
