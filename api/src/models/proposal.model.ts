import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

export interface ProposalAttributes {
  uuid: string
  search_session_uuid: string
  tconst: string
  accepted: boolean | null
  rejected_feedback: 'too_long' | 'too_old' | 'too_violent' | 'too_scary' | null
  already_seen: boolean | null
  already_seen_feedback: 'liked' | 'disliked' | 'do_not_remember' | null
}

export type ProposalCreationAttributes = Optional<ProposalAttributes, 'uuid' | 'accepted' | 'rejected_feedback' | 'already_seen' | 'already_seen_feedback'>

class Proposal extends Model<ProposalAttributes, ProposalCreationAttributes> implements ProposalAttributes {
  declare uuid: string
  declare search_session_uuid: string
  declare tconst: string
  declare accepted: boolean | null
  declare rejected_feedback: 'too_long' | 'too_old' | 'too_violent' | 'too_scary' | null
  declare already_seen: boolean | null
  declare already_seen_feedback: 'liked' | 'disliked' | 'do_not_remember' | null

  declare readonly created_at: Date
  declare readonly updated_at: Date

  // associations
  declare title?: { start_year: number | null; runtime_minutes: number | null; video?: unknown }

  static initModel(sequelize: Sequelize): typeof Proposal {
    Proposal.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      search_session_uuid: {
        type: DataTypes.UUID,
        allowNull: false
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
      sequelize,
      modelName: 'proposal',
      tableName: 'proposals',
      timestamps: true,
      underscored: true
    })

    return Proposal
  }
}

export default Proposal
