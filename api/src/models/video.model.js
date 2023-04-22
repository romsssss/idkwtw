module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('videos', {
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
    tableName: 'videos',
    timestamps: true,
    underscored: true
  })

  return Video
}
