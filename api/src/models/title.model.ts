import { Model, DataTypes, Sequelize } from 'sequelize'

export interface TitleAttributes {
  tconst: string
  title_type: string | null
  primary_title: string | null
  original_title: string | null
  is_adult: boolean | null
  start_year: number | null
  end_year: number | null
  runtime_minutes: number | null
  genres: string[] | null
  average_rating: number | null
  num_votes: number | null
  directors: string[] | null
  writers: string[] | null
}

class Title extends Model<TitleAttributes> implements TitleAttributes {
  declare tconst: string
  declare title_type: string | null
  declare primary_title: string | null
  declare original_title: string | null
  declare is_adult: boolean | null
  declare start_year: number | null
  declare end_year: number | null
  declare runtime_minutes: number | null
  declare genres: string[] | null
  declare average_rating: number | null
  declare num_votes: number | null
  declare directors: string[] | null
  declare writers: string[] | null

  static initModel(sequelize: Sequelize): typeof Title {
    Title.init({
      tconst: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      title_type: {
        type: DataTypes.STRING
      },
      primary_title: {
        type: DataTypes.TEXT
      },
      original_title: {
        type: DataTypes.TEXT
      },
      is_adult: {
        type: DataTypes.BOOLEAN
      },
      start_year: {
        type: DataTypes.INTEGER
      },
      end_year: {
        type: DataTypes.INTEGER
      },
      runtime_minutes: {
        type: DataTypes.INTEGER
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      average_rating: {
        type: DataTypes.DECIMAL
      },
      num_votes: {
        type: DataTypes.INTEGER
      },
      directors: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      writers: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    }, {
      sequelize,
      modelName: 'title',
      tableName: 'titles',
      timestamps: false,
      underscored: true
    })

    return Title
  }
}

export default Title
