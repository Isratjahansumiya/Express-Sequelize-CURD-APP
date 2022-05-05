const {Model,DataTypes}= require('sequelize');
const sequelize=require('./database')
class user extends Model{}
//initialize table and attributes
user.init({
    username:{
        type: DataTypes.STRING,
        validate: {
            len: {
              args: [3, 8],
              msg: 'Name too long.'
            }
          }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    }
},
{
    sequelize,
    modelName: 'user',
    timestamps: false
})
module.exports=user;