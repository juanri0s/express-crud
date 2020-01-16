const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExampleSchema = new Schema({});

const Example = mongoose.model('Example', ExampleSchema);

module.exports = Example;
