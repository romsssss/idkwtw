module.exports = (sequelize, DataTypes) => {
  const SearchSession = sequelize.define('search_session', {
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
    }
  }, {
    tableName: 'search_sessions',
    timestamps: true,
    underscored: true
  })

  return SearchSession
}
