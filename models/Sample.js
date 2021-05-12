const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sampleSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { collection: 'sample', timestamps: true }
);

const Sample = mongoose.model('Sample', sampleSchema);
module.exports = Sample;
