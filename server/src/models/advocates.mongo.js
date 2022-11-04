const mongoose = require("mongoose");

const advocatesSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    profile_pic_stored: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    companies: {
      type: Array,
      required: true,
    },
    follower_count: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

// advocatesSchema.set("toObject", {
//   transform: function (doc, ret) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   },
// });

module.exports = mongoose.model("Advocate", advocatesSchema);
