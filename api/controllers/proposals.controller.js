const db = require("../models");
const SearchSession = db.search_sessions;
const Proposal = db.proposals;
// const Title = db.titles;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const search_session_uuid = req.query.search_session_uuid;
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!search_session_uuid) {
    res.status(400).send({message: "Missing search_session_uuid param"});
    return;
  } else if (!uuidRegexExp.test(search_session_uuid)) {
    res.status(400).send({message: "Invalid Search Session UUID syntax"});
    return;
  }

  const search_session = await SearchSession.findByPk(search_session_uuid)
  if (!search_session) {
    res.status(404).send({
      message: `Unknown Search Session with uuid=${search_session_uuid}.`
    });
    return
  }

  const proposal = {
    tconst: 'tt13683364',
    search_session_uuid: search_session.uuid
  };

  Proposal.create(proposal, {include: SearchSession})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proposal."
      });
    });
};

exports.findOne = (req, res) => {
  const uuid = req.params.uuid;

  Proposal.findByPk(uuid)
    .then(proposal => {
      if (proposal) {
        res.send(proposal);
      } else {
        res.status(404).send({
          message: `Cannot find Proposal with uuid=${uuid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Proposal with uuid=" + uuid
      });
    });
};

exports.findAll = async (req, res) => {
  const search_session_uuid = req.query.search_session_uuid;
  const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!search_session_uuid) {
    res.status(400).send({message: "Missing search_session_uuid param"});
    return;
  } else if (!uuidRegexExp.test(search_session_uuid)) {
    res.status(400).send({message: "Invalid Search Session UUID syntax"});
    return;
  }

  const search_session = await SearchSession.findByPk(search_session_uuid)
  if (!search_session) {
    res.status(404).send({
      message: `Unknown Search Session with uuid=${search_session_uuid}.`
    });
    return
  }

  Proposal.findAll({ where: { search_session_uuid: search_session.uuid }})
    .then(proposals => {
      res.send(proposals);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Proposals for search_session_uuid=" + search_session_uuid
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

  Proposal.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proposal was updated successfully."
        });
      } else { // improve error handling here !
        res.send({
          message: `Cannot update Proposal with uuiid=${uuid}. Maybe Proposal was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proposal with uuid=" + uuid
      });
    });
};
