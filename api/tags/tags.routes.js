const express = require("express");
const router = express.Router();
const {
  tagsGet,
  tagsUpdate,
  tagsDelete,
  tagsCreate,
  fetchTag,
  tagAdd,
} = require("./tags.controllers");

router.param("tagId", async (req, res, next, tagId) => {
  const tag = await fetchTag(tagId, next);
  if (tag) {
    req.tag = tag;
    next();
  } else {
    const err = new Error("Tag Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", tagsGet);
router.post("/", tagsCreate);
router.put("/", tagAdd);

router.delete("/:tagId", tagsDelete);

router.put("/:tagId", tagsUpdate);

module.exports = router;
