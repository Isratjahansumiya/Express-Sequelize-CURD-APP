const {Model,DataTypes}= require('sequelize');
const sequelize=require('./database')
class user extends Model{}
user.init({
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
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