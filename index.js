const express= require('express');
const sequelize= require('./database');
const user=require('./user');
const port = 8080;

const app = express();
app.use(express.json());

//creating database
sequelize.sync().then(()=>{
    console.log('Database is ready to use')
})

//creating data
app.post('/users',async(req, res)=>{
    await user.create(req.body)
    res.send('user is inserted')

})
// Get data
app.get('/users',async(req, res)=>{
    const Users=await user.findAll();
    res.send(Users);
})

//get specific user
app.get('/users/:id/',async(req, res)=>{
    const requestedId=req.params.id;
    const User=await user.findOne({where: {id:requestedId}});
    res.send(User);

})
//update user
app.put('/users/:id/',async(req,res)=>{
    const requestedId=req.params.id;
    const User=await user.findOne({where: {id:requestedId}});
    User.username=req.body.username;
    User.email=req.body.email;
    User.phone=req.body.phone;
    User.address=req.body.address;
    await User.save();
    res.send('updated user')
})
//delete user

app.delete('/users/:id/',async(req, res)=>{
    const requestedId=req.params.id;
    await user.destroy({where: {id:requestedId}})
    res.send('removed');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });