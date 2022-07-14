const { verifyToken } = require("../middlewares/index.js");
const testController = require("../controllers/test.controller.js");

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
  *    name: Test
  *    description: Test API
  */

  /**
  * @swagger
  * /api/test/public:
  *   get:
  *     summary: get public content
  *     tags: [Test]
  *     responses:
  *       200:
  *         description: public content
  *         content:
  *           text/html:
  *             schema:
  *               type: string
  *             example:
  *                public area
  */
  app.get("/api/test/public", testController.public);

  /**
  * @swagger
  * /api/test/user:
  *   get:
  *     summary: get user content
  *     tags: [Test]
  *     parameters:
  *       - name: x-access-token
  *         in: header
  *         required: true
  *     responses:
  *       200:
  *         description: user content
  *         content:
  *           text/html:
  *             schema:
  *               type: string
  *             example:
  *                user area
  *       401:
  *         description: missing or invalid token
  */
  app.get("/api/test/user", [verifyToken], testController.user);
};
