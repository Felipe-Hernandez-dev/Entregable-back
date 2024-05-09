import express from 'express';
import { UserManager } from './managers/user.manager.js';
const userManager = new UserManager ("./user.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', async (req, res) => {
    try{
       const users = await userManeger.getUsers();
       res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

app.get('/user/:id', async (req, res) => {
    try{
       const {idUser} = req.params;
       const user =  await userManeger.gerUserById(idUser);
       if(!user) res.status(204).json({msg: 'User not found'});
       else res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

app.post('/user', async (req, res) => {
    try{
        const user = userManeger.createUser(req.body)
        if(!user) res.status(404).json({msg: 'User Already exist'});
        else res.status(201).json(user);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

const PORT = 8080;

app.listen(PORT, () => console.log(`server ok en puerto ${PORT}`));