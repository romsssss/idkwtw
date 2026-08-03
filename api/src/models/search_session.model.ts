import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

export interface SearchSessionAttributes {
  uuid: string
  public: 'alone' | 'date' | 'partner' | 'kids' | 'friends' | 'family' | null
  genres: string[] | null
  tconst_chosen: string | null
  exit_feedback: 'just_browsing' | 'nothing_fits_mood' | 'dont_know_movies' | 'other' | null
  exit_feedback_note: string | null
}

export type SearchSessionCreationAttributes = Optional<SearchSessionAttributes, 'uuid' | 'exit_feedback' | 'exit_feedback_note'>

class SearchSession extends Model<SearchSessionAttributes, SearchSessionCreationAttributes> implements SearchSessionAttributes {
  declare uuid: string
  declare public: 'alone' | 'date' | 'partner' | 'kids' | 'friends' | 'family' | null
  declare genres: string[] | null
  declare tconst_chosen: string | null
  declare exit_feedback: 'just_browsing' | 'nothing_fits_mood' | 'dont_know_movies' | 'other' | null
  declare exit_feedback_note: string | null

  declare readonly created_at: Date
  declare readonly updated_at: Date

  static initModel(sequelize: Sequelize): typeof SearchSession {
    SearchSession.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      public: {
        type: DataTypes.ENUM('alone', 'date', 'partner', 'kids', 'friends', 'family')
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      tconst_chosen: {
        type: DataTypes.STRING
      },
      exit_feedback: {
        type: DataTypes.ENUM('just_browsing', 'nothing_fits_mood', 'dont_know_movies', 'other')
      },
      exit_feedback_note: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      modelName: 'search_session',
      tableName: 'search_sessions',
      timestamps: true,
      underscored: true
    })

    return SearchSession
  }
}

export default SearchSession
