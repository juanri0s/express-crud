const Party = require('../models/Party.model');

exports.getExampledById = async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.method);

  const exampleId = req.params.exampleId;
  console.log('getting example information for:', exampleId);

  Party.findById(req.params.exampleId, (err, example) => {
    if (err) {
      console.log('error in getting example from db for id:', exampleId);
      return res.status(500).json(err);
    }

    if (!example) {
      console.log('example does not exist');
      return res.status(204).json(example);
    }

    console.log('successful example get from db');
    return res.status(200).json(example);
  })
};

exports.getExamples = async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.method);
  console.log('getting all examples');

  Party.find({}, (err, examples) => {
    if (err) {
      console.log('error in getting examples from db');
      res.status(500).json(err);
      return;
    }

    if (!examples) {
      console.log('no examples to return');
      return res.status(204);
    }

    console.log(`got ${examples.length} parties from db`);
    return res.status(200).json(examples);
  })
};

exports.addExample = async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.method);

  const example = new Party(req.body);

  console.log(`adding ${example._id} to db`);

  example.save((err, example) => {
    if (err) {
      console.log('unable to save example to db for request:', example);
      return res.status(500).json('unable to save example to db');
    }

    console.log(`successfully added ${example._id} to db`);
    return res.status(200).json('Example added successfully');
  });
};

exports.deleteExample = async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.method);

  const exampleId = req.params.exampleId;

  if (!exampleId) {
    console.log('example_id cannot be null');
    return res.status(400).json(req.params.id);
  }

  console.log('deleting example in db:', exampleId);

  Party.deleteOne({ "_id": exampleId }, (err, resp) => {
    if (err) {
      console.log(`error in deleting example from db for id: ${exampleId}`);
      return res.status(500).json(err);
    }

    if (!resp.deletedCount.length) {
      console.log(`deleted ${resp.deletedCount} examples`);
      return res.status(404).json(resp.deletedCount);
    }

    console.log(`successfully deleted ${resp.deletedCount} examples`);
    return res.status(200).json(req.params.id);
  });

};

exports.updateExample = async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.method);

  const exampleId = req.params.partyId;

  console.log(`updating ${exampleId} in db`);

  Party.findById(exampleId, (err) => {
    if (err) {
      console.log('error in finding example from db for id:', exampleId);
      return res.status(500).json(err);
    }

    console.log('exampleId found, trying to update');
  })

  Party.findOneAndReplace(exampleId, { $set: req.body }, (err) => {
    if (err) {
      console.log(`error in updating ${exampleId}`);
      return res.status(404).json();
    }

    console.log(`successfully updated ${exampleId}`);
    return res.status(200).json();
  });

};