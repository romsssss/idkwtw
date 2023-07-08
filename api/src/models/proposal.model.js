module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define('proposal', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    tconst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN
    },
    rejected_feedback: {
      type: DataTypes.ENUM('too_long', 'too_old', 'too_violent', 'too_scary')
    },
    already_seen: {
      type: DataTypes.BOOLEAN
    },
    already_seen_feedback: {
      type: DataTypes.ENUM('liked', 'disliked', 'do_not_remember')
    }
  }, {
    tableName: 'proposals',
    timestamps: true,
    underscored: true
  })

  return Proposal
}
