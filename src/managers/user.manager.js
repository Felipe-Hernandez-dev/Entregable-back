import fs from 'fs';
import { v4 as uuidv4} from "uuid";

export class UserManager {
    constructor(path) {
        this.path = path;
    }

    async getUser(){
    try {
        if (fs.existsSync(this.path)) {
            const user = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(users)
        } else return [];
    } catch (error) {
        console.log(error);  
    }
    }

    async createUser(obj) {
        try {
            const user = {
                id: uuidv4(),
                ...obj               
            };
            const usersFile = await this.getUsers();
            const userExist = usersFile.find((u) => u.username === user.username);
            if(userExist) return null
            usersFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
            return user;

        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id){
        try {
            const usersFile = await this.getUsers();
            const userExist = usersFile.find((u) => u.id === id);
            if(!userExist) return null;
            return userExist;
        } catch (error) {
            console.log(error);
         }
    }

    async updateUser(obj, id) {
        try {
            const usersFile = await this.gerUsers();
            let userExist = await this.getUserById(id);
            if(!userExist) return null;
            userExist = { ...userExist, ...obj };
            const newArray = usersFile.filter((u) => u.id !== id);
            newArray.push(userExist);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return userExist
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(id){
        try {
            const usersFile = await this.getUsers();
            if(usersFile.length > 0) {
                const userExist = await this.getUserById(id);
                if(!userExist) return null;
                    const newArray = usersFile.filter((u) => u.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                    return userExist
            } else return null;
        } catch (error) {
            console.log(error);
        }
    }    
}
