const {Model, DataTypes} = require ('sequelize');
const sequelize = require("../config/connection");

class LoginInfo extends Model {} 

LoginInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        modelName: "loginInfo"
    }
)
module.exports = LoginInfo;