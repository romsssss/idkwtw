import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

export interface VideoAttributes {
  uuid: string
  name: string | null
  type: 'trailer'
  site: 'youtube'
  key: string
  size: number | null
  official: boolean | null
  iso_639_1: string | null
  iso_3166_1: string | null
  published_at: Date | null
  tconst?: string
}

export type VideoCreationAttributes = Optional<VideoAttributes, 'uuid'>

class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
  declare uuid: string
  declare name: string | null
  declare type: 'trailer'
  declare site: 'youtube'
  declare key: string
  declare size: number | null
  declare official: boolean | null
  declare iso_639_1: string | null
  declare iso_3166_1: string | null
  declare published_at: Date | null
  declare tconst: string

  declare readonly created_at: Date
  declare readonly updated_at: Date

  static initModel(sequelize: Sequelize): typeof Video {
    Video.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.TEXT
      },
      type: {
        type: DataTypes.ENUM('trailer'),
        allowNull: false
      },
      site: {
        type: DataTypes.ENUM('youtube'),
        allowNull: false
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size: {
        type: DataTypes.INTEGER
      },
      official: {
        type: DataTypes.BOOLEAN
      },
      iso_639_1: {
        type: DataTypes.STRING
      },
      iso_3166_1: {
        type: DataTypes.STRING
      },
      published_at: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      modelName: 'videos',
      tableName: 'videos',
      timestamps: true,
      underscored: true
    })

    return Video
  }
}

export default Video
