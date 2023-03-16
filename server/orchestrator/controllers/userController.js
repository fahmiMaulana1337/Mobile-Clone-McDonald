const axios = require('axios');
const serverUser = "http://localhost:4001";

class UserController {
    static async showUser(req, response, next) {
        try {
            const cacheUser = await redis.get("users");
            if (cacheUser) {
              const users = JSON.parse(cacheUser);
              return res.status(200).json(users);
            }
            const { data } = await axios({
                method: 'get',
                url: `${serverUser}/users/`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await redis.set("users", JSON.stringify(data))
            response.status(200).json(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    static async createUser(req,response,next){
        try {
            const {email,password}=req.body;
            const {data}= await axios({
                method: 'post',
                url: `${serverUser}/users/`,
                data:{
                    email,
                    password
                }
            
            })
            await redis.del("users")
            response.status(201).json(data)
          
        } catch (error) {
            console.log(error)
        }
    }
    static async detailUser(req, response, next) {
        {
            const id = req.params.id
            try {
                const { data } = await axios({
                    method: 'get',
                    url: `${serverUser}/users/${req.params.id}`,
                })
                response.status(200).json(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    static async deleteUser(req, response, next) {
    try {
        console.log('masuk')
        const id=req.params.id
        console.log(id)
        const {data} = await axios({
            method: 'delete',
            url: `${serverUser}/users/${id}`
        })
        await redis.del("users")
        response.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
    }
}

module.exports = UserController;