const notificationsController = require("../controllers/notifications.controller.js");

module.exports = (app) => {
  /**
  * @swagger
  *  tags:
  *    name: Notifications
  *    description: Notifications API
  */

  /**
  * @swagger
  * /api/notifications:
  *   post:
  *     summary: queue email notification
  *     tags: [Notifications]
  *     parameters:
  *       - in: query
  *         name: email
  *         schema:
  *           type: string
  *         required: true
  *         description: user's email
  *       - in: query
  *         name: username
  *         schema:
  *           type: string
  *         required: true
  *         description: user's username
  *     responses:
  *       200:
  *         description: notification successfully queued
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                   type: string
  *             example:
  *                message: "success"
  *       404:
  *         description: missing email or username
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
  *                   error: "missing email"
  *               invalid:
  *                 value:
  *                   error: "missing username"
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
  app.post("/api/notifications", notificationsController.add);
};
