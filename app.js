const express=require('express');
const userModel=require('./models/user');
const postModel=require('./models/post');

const app=express();

app.get('/',(req,res)=>{
    res.send("hey");
})

app.post('/')

app.get('/create',async(req,res)=>{
   let user= await userModel.create({
        username:"dhruv",
        age:25,
        email:"dhruv123@gmail.com"
    })

    res.send(user);
})

app.get('/create/post', async (req, res) => {
    try {
        
        let user = await userModel.findOne({ username: "dhruv" });

        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        
        let post = await postModel.create({
            postdata: "hello saare keso ho",
            user: user._id 
        });

        
        user.posts.push(post._id);
        await user.save();

        res.send({ post, user });
    } catch (error) {
        res.status(500).send(error);
    }
});

 


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})