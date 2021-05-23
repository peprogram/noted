const express = require("express");
const NotesService = require("./NotesService");
const router = express.Router();
const dated = new Date();

module.exports = (param) => {
  const { noteService } = param;

  router.get("/", async (req, res, next) => {
    try {
      const noteslist = await noteService.getList();
      return res.render("notes", {
        page: "Notes",
        noteslist,
        success: req.query.success,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const noteTitle = req.body.noteTitle.trim();
      const noteMessage = req.body.noteMessage.trim();
      const noteslist = await noteService.getList();

      if (!noteMessage) {
        return res.render("notes", {
          page: "Notes",
          error: true,
          noteTitle,
          noteMessage,
        });
      }
      await noteService.addEntry(noteTitle, noteMessage, dated.toDateString());
      return res.redirect("/?success=true");
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
