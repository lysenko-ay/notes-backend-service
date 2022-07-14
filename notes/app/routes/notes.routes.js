const { verifyToken } = require("../middlewares/index.js");
const notesController = require("../controllers/notes.controller.js");

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
  *    name: Notes
  *    description: Notes API
  */

  /**
  * @swagger
  * /api/notes:
  *   get:
  *     summary: get all notes
  *     tags: [Notes]
  *     responses:
  *       200:
  *         description: all notes
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                   - id: int
  *                   - userId: int
  *                   - text: string
  *                   - createdAt: string
  *                   - updatedAt: string
  *             example:
  *                - id: 1
  *                  userId: 1
  *                  text: example text
  *                  createdAt: 2022-06-13T18:42:03.002Z
  *                  updatedAt: 2022-06-13T18:42:03.002Z
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
  app.get("/api/notes", notesController.getAll);


  /**
  * @swagger
  * /api/notes/{id}:
  *   get:
  *     summary: get one note
  *     tags: [Notes]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: note id
  *     responses:
  *       200:
  *         description: one note
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 - id: int
  *                 - userId: int
  *                 - text: string
  *                 - createdAt: string
  *                 - updatedAt: string
  *             example:
  *                id: 1
  *                userId: 1
  *                text: example text
  *                createdAt: 2022-06-13T18:42:03.002Z
  *                updatedAt: 2022-06-13T18:42:03.002Z
  *       404:
  *         description: note not found
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
  app.get("/api/notes/:id", notesController.getOne);

  /**
  * @swagger
  * /api/notes:
  *   post:
  *     summary: add new note
  *     tags: [Notes]
  *     parameters:
  *       - in: query
  *         name: text
  *         schema:
  *           type: string
  *         required: true
  *         description: note's text
  *       - in: header
  *         name: x-access-token
  *         required: true
  *         description: jwt access token
  *     responses:
  *       200:
  *         description: note successfully added
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
  app.post("/api/notes", [verifyToken], notesController.add);

  /**
  * @swagger
  * /api/notes/{id}:
  *   put:
  *     summary: update existing note
  *     tags: [Notes]
  *     parameters:
  *       - in: query
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: note id
  *       - in: query
  *         name: text
  *         schema:
  *           type: string
  *         required: true
  *         description: note's new text
  *       - in: header
  *         name: x-access-token
  *         required: true
  *         description: jwt access token
  *     responses:
  *       200:
  *         description: note successfully updated
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
  *         description: user is not an owner of this note
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: "not an owner"
  *       404:
  *         description: note not found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: "not found"
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
  app.put("/api/notes/:id", [verifyToken], notesController.update);

  /**
  * @swagger
  * /api/notes/{id}:
  *   delete:
  *     summary: delete existing note
  *     tags: [Notes]
  *     parameters:
  *       - in: query
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: note id
  *       - in: header
  *         name: x-access-token
  *         required: true
  *         description: jwt access token
  *     responses:
  *       200:
  *         description: note successfully deleted
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
  *         description: user is not an owner of this note
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: "not an owner"
  *       404:
  *         description: note not found
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 error:
  *                   type: string
  *             example:
  *                error: "not found"
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
  app.delete("/api/notes/:id", [verifyToken], notesController.delete);
};
