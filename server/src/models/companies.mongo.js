const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  link: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Company", companiesSchema);
