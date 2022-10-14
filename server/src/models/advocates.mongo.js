const mongoose = require("mongoose");

const advocatesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  url: {
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
  short_bio: {
    type: String,
    required: true,
  },
  long_bio: {
    type: String,
    required: true,
  },
  advocate_since: {
    type: String,
    required: true,
  },
  company: {
    type: Number,
    required: true,
  },
  links: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Advocate", advocatesSchema);
