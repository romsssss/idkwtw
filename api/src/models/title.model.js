module.exports = (sequelize, DataTypes) => {
  const Title = sequelize.define('title', {
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
    tableName: 'titles',
    timestamps: false,
    underscored: true
  })

  return Title
}
