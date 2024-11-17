const { model, Schema } = require("mongoose");
const Author = require("./Author");

const PostSchema = new Schema({
  title: String,
  body: String,
  authorId: { type: Schema.Types.ObjectId, ref: "Author" },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

module.exports = model("Post", PostSchema);

// const { model, Schema } = require('mongoose');

// const CourseSchema = new Schema({
//   name: String,
//   teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
// });

// module.exports = model('Course', CourseSchema);
