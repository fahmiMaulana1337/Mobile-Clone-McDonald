const axios = require("axios")
const redis = require("../configs/redisConnection");
const serverApp = "http://app:4002"

const typeDefs = `#graphql
type Items {
    id: Int,
    name: String,
    imgUrl: String,
}
type Item {
    id: Int,
    name: String,
    description: String,
    price: String,
    imgUrl: String,
    Ingredients: [Ingredients],
    User : user
    Category: Category
}
type Category {
    name : String
}
type Ingredients {
    name : String
}
type Query {
    items: [Items]
    item(id : ID) : Item
}
type createItem {
    id: Int,
    name: String,
    price: Int,
    description: String
    imgUrl : String
    authorId : String
    categoryId : Int
}
type editedItem {
    message: String
}
type deleteItem {
    message: String
}
input newIngredients {
    name:[String]
}
type user {
    email : String
}
input newItem {
    name : String
    description : String
    price : Int
    imgUrl : String
    authorId : String
    categoryId : Int
    ingredients : [newIngredients]
}
input editItem {
    name : String
    description : String
    price : Int
    imgUrl : String
    authorId : String
    categoryId : Int
    ingredients : [newIngredients]
}
type Mutation {
    addItem(inputValue: newItem): createItem
    editItemById(id: ID, inputValue: editItem): editedItem
    deleteItem(id: ID): deleteItem
}
`

const resolvers = {
    Query : {
        items: async ()=> {
            try {
                const cacheItems = await redis.get("items")
                if (cacheItems){
                    const items = JSON.parse(cacheItems)
                    return items
                }

                const { data } = await axios({
                    method : "get",
                    url : `${serverApp}/item`
                })
                console.log(data)
                await redis.set("items", JSON.stringify(data))
                return data
            } catch (error) {
                throw error.response.data
            }
        },
        item: async (_, args) =>{
            try {
                const {id} = args
                console.log(id)
                const cacheItem = await redis.get("item")
                if (cacheItem.id == id){
                    const item = JSON.parse(cacheItem)
                    return item
                }
                const {data} = await axios({
                    method : "get",
                    url : `${serverApp}/item/${id}`
                })
                console.log(data.data)
                const {data:dataUser} = await axios({
                    method: "get",
                    url : `http://users:4001/users/${data.data.authorId}`
                })
                console.log(data.data.authorId,"<<<<<<<<<<<<<<<<<")
               data.data.User=dataUser.data               
            
                await redis.set("item", JSON.stringify(data.data))
                console.log(data.data)
                return data.data
            } catch (error) {
                console.log(error)
                throw error.response.data
            }
        }
    },
    Mutation : {
        addItem: async (_, args) => {
            try {
                let {name, description, price, imgUrl, authorId, categoryId, ingredients} = args.inputValue
                let temp=[]
                ingredients.map(el=>{
                    temp.push(el.name[0])
                })
                ingredients=temp;
                const {data} = await axios ({
                    method : 'post',
                    url : `${serverApp}/item`,
                    data : {name, description, price, imgUrl, authorId, categoryId, ingredients}
                })
                console.log(data.data)
                await redis.del("items", JSON.stringify(data))
                return data.data
            } catch (error) {
                // console.log(error)
                throw error.response.data
            }
        },
        editItemById : async (_, args) => {
            try {
                const {id} = args
                
                const {name, description, price, imgUrl, authorId, categoryId } = args.inputValue
                console.log(args.inputValue);

                const {data} = await axios({
                    method : "put",
                    url : `${serverApp}/item/${id}`,
                    data : {name, description, price, imgUrl, authorId, category:categoryId}
                })
                await redis.del("items")
                return data
            } catch (error) {
                // console.log(error)
                throw error.response.data
            }
        },
        deleteItem: async (_, args) => {
            try {
                const {id} = args
                const {data} = await axios({
                    method : "delete",
                    url : `${serverApp}/item/${id}`,
                })
                await redis.del("items")
                return data
            } catch (error) {
                console.log(error)
                throw error.response.data
            }
        }
    }
}

module.exports = {typeDefs, resolvers}