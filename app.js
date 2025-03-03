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

app.get('/create/post',async(req,res)=>{
 let post=await postModel.create({
        postdata:"hello saare keso ho",
        user:"4545325fdgdgdggfgfg"

    })

  let user=await userModel.findOne({_id:"4545325fdgdgdggfgfg"})

  user.posts.push(post._id);
  await user.save();
  res.send({post,user});
 })
 


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})