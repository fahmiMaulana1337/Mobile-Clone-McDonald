const axios = require('axios');
const server = "http://localhost:4002";
const userServer = "http://localhost:4001";
const redis = require("../configs/redisConnection");

class ItemController {
    static async getAllItems(req, response, next) {
        try {
            let cacheItem = await redis.get("items");
            if (cacheItem) {
              return res.status(200).json(JSON.parse(cacheItem));
            } 
            const item = await axios({
                method: 'get',
                url: `${server}/item`,
            })
            const foundItem = item.data
            const userResponse = await axios({
                method: 'get',
                url: `${userServer}/users`
            })
            let data = foundItem.map(item => {
                let user = userResponse.data.data.find(user => user._id === item.authorId);
                if(user){
                    item.authorId = user._id
                }
                return item
            })
            await redis.set("items", JSON.stringify(result));
            response.status(200).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async detailItem(req, response, next) {
        try {
            let cacheItem = await redis.get("item");
            if (cacheItem) {
              return res.status(200).json(JSON.parse(cacheItem));
            } 
            const id = req.params.id;
            const item = await axios({
                method: "get",
                url: `${server}/pub/item/${id}`,
            });
         
            const dataItems = item.data;
         
            if(!dataItems){
                throw {name:"notFound"}
            }
            const userResponse = await axios({
                method: "get",
                url: `${userServer}/users`,
            });
            response.status(200).json(dataItems)
        } catch (error) {
            console.log(error)
            next(error)

        }
    }
    static async createItem(req, res, next) {
        try {
            const {
                name,
                description,
                price,
                imgUrl,
                category,
                ingredients,
            } = req.body;

            const { data } = await axios({
                method: "post",
                url: `${server}/item`,
                data: {
                    name,
                    description,
                    price,
                    imgUrl,
                    authorId: '63f71f20448a26b7500aabcd',
                    categoryId: category,
                    ingredients,
                },
            });
            await redis.del("items");
            res.status(201).json(data);
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async deleteById(req, res, next) {
        try {
            const id = req.params.id;

            const { data } = await axios({
                method: "delete",
                url: `${server}/item/${id}`,
            });
            await redis.del("items");

            res.status(201).json(data);
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async editItem(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description, price, imgUrl, authorId, categoryId } =
                req.body;

            const { data } = await axios({
                method: "put",
                url: `${server}/item/${id}`,
                data: { name, description, price, imgUrl, authorId, categoryId },
            });
            await redis.del("items");
            res.status(201).json(data);
        } catch (error) {
            next(error)
            console.log(error);
        }
    }
}


module.exports = ItemController;