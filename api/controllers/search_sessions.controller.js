const db = require("../models");
const SearchSession = db.search_sessions;
const Proposal = db.proposals;
// const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const search_session = {
    public: req.body.public,
    genres: req.body.genres
  };

  SearchSession.create(search_session)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Search Session."
      });
    });
};

exports.findOne = (req, res) => {
  const uuid = req.params.uuid;
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!uuidRegexExp.test(uuid)) {
    res.status(400).send({message: "Invalid UUID syntax"});
    return;
  }

  SearchSession.findByPk(uuid, { include: [Proposal]})
    .then(search_session => {
      if (search_session) {
        res.send(search_session);
      } else {
        res.status(404).send({
          message: `Cannot find Search Session with uuid=${uuid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Search Session with uiid=" + uuid
      });
    });
};

exports.update = (req, res) => {
  const uuid = req.params.uuid;
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!uuidRegexExp.test(uuid)) {
    res.status(400).send({message: "Invalid UUID syntax"});
    return;
  }

  SearchSession.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Search Session was updated successfully."
        });
      } else { // improve error handling here !
        res.send({
          message: `Cannot update Search Session with uuiid=${uuid}. Maybe Search Session was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Search Session with uuid=" + uuid
      });
    });
};
