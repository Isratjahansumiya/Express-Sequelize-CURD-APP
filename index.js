const express= require('express');
const sequelize= require('./database');
const user=require('./user');
const port = 8080;

const app = express();

//// built-in middleware for express. It send JSON to client.

app.use(express.json());

// creating database connection.Most of the method of Sequelize are asynchronous and therefore return Promises
sequelize.sync().then(()=>{
    console.log('Database is running')
})

// creating data
app.post('/users',async(req, res)=>{
    try {
        const postUser=await user.create(req.body)
        res.status(200).json(postUser);
    } catch (error) {
        res.status(404).json({ error: "Can't add user" });
    }
})
// Get data
app.get('/users',async(req, res)=>{
    try {
        const Users=await user.findAll();
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ error: "User does not exists" })
    }
})

// get specific user
app.get('/users/:id/',async(req, res,next)=>{
    try {
        const requestedId=req.params.id;
        const User=await user.findOne({where: {id:requestedId}});
        res.status(200).json(User);
    } catch (error) {
        res.status(404).json({ error: "User does not exists" })
    }
})
// update user
app.put('/users/:id/',async(req,res,next)=>{
    try {
        const requestedId=req.params.id;
        const User=await user.findOne({where: {id:requestedId}});
        User.username=req.body.username;
        User.email=req.body.email;
        User.phone=req.body.phone;
        User.address=req.body.address;
        await User.save();
        res.status(200).json(User)
    } catch (error) {
        res.status(404).json({ error: "User can not be updated." })
    }
})
// delete user

app.delete('/users/:id/',async(req, res)=>{
    try {
       const requestedId=req.params.id;
       const User=await user.findOne({where: {id:requestedId}});
       if(User){
        await user.destroy({where: {id:requestedId}});
        res.status(200).json({ message: "User removed" });
       }
       else{
        res.status(404).json({ error: "User can't be removed" })
       }
    } catch (error) {
        res.status(404).json({ error: "User can't be removed" })
    }

})

// Url Error Handling
app.use((req, res) => {	// Default: any other request
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: "URL doesn't exist" });

});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});