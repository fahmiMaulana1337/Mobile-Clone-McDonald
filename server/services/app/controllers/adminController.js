const { hash, compare, encodeToken } = require('../helpers/helper');
const { User, Category, Item, Ingredient, sequelize } = require('../models/index')
class AdminController {
  static async register(req, response, next) {
    try {
      const { email, password,phoneNumber,address } = req.body;

      const user = await User.create({
        email,
        password,
        role: 'Admin',
        phoneNumber,
        address
      });
      response.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, response, next) {
    try {
      const { email, password } = req.body;
      console.log(email,password)

      if (!email || !password) {
        throw {
          name: "required",
        };
      }

      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw {
          name: "Invalid Login",
        };
      }

      let compareResult = compare(password, user.password);
      if (!compareResult) {
        throw {
          name: "Invalid Login",
        };
      } else {
        const { id, email } = user;
        let token = encodeToken({
          id,
          email,
        });
        console.log(token);
        response.status(200).json({
          token
        });
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async getCategory(req, response, next) {
    try {
      const data = await Category.findAll()
      response.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async addCategory(req, response, next) {
    try {
      const { name } = req.body

      const data = await Category.create({
        name
      })
      response.status(201).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getItem(req, response, next) {
    try {
      const data = await Item.findAll({
        include:[Category,Ingredient]
      })
      response.status(200).json(data)
    } catch (error) {
      next(error);
    }
  }
  static async createItem(req, response, next) {
    // console.log(req.body,"<><><><><><><><><><><><><><><><><><><>")
    const t = await sequelize.transaction();
    try {
      const { name, description, price, imgUrl, categoryId, authorId,ingredients } = req.body;
      console.log(ingredients,"<><><><><><><><><><><><><><><><><><><>")
      const data = await Item.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId
      }, { transaction: t })
      let tempIngrident = []
        if(Array.isArray(ingredients)){
         ingredients.map(el => {
          let temp = {};
          console.log(data.id)
          temp.itemId = data.id
          temp.name = el
          tempIngrident.push(temp);
        })
      }else{
        let temp = {};
        temp.itemId = data.id
        temp.name = ingredients
        tempIngrident.push(temp);
      }
      
      await Ingredient.bulkCreate(tempIngrident, { transaction: t })

      await t.commit()
      response.status(201).json({ data, tempIngrident })
    } catch (error) {
      console.log(error)
      await t.rollback();
      next(error)
    }
  }
  static async deleteItem(req, response, next) {
    try {
      const id = req.params.id;

      const data = await Item.destroy({
        where: {
          id
        }
      })

      response.status(200).json({ message: "Success Delete Items" })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async deleteCategory(req, response, next) {
    try {
      const id = req.params.id
      const data = await Category.destroy({
        where: {
          id
        }
      })
      response.status(200).json({ message: "Success delete category" })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async addForm(req, response, next) {
    try {
      const category = await Category.findAll()
      response.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
  static async editForm(req,response,next){
    try {
      const id = req.params.id
      const data = await Item.findOne({
        include:[Category,Ingredient],
        where: {
          id
        }
      })
      if(!data){
        throw{name: "Data not found"}
      }
      const category= await Category.findAll({})
      response.status(200).json({data,category})
    } catch (error) {
      next(error)
    }
  }
  static async updateItem(req, response, next) {
    const t = await sequelize.transaction()
    try {
      const id = req.params.id
      console.log(id)
      const { name, description, price, imgUrl, category, ingredients } = req.body;
      console.log(name, description, price, imgUrl, req.body.category)
      const deleteDataIngridients = await Ingredient.destroy({
        where: {
          itemId: id
        }
      }, { transaction: t })

      const data = await Item.update({
        name,
        description,
        price,
        imgUrl,
        categoryId:category,
        authorId:'63f71f20448a26b7500aabcd'
      }, {
        where: { id }
      }, { transaction: t })
      let tempIngrident = []
      if(ingredients){
        let dataIngridient = ingredients.map(el => {
          let temp = {};
          temp.itemId = id
          temp.name = el
          tempIngrident.push(temp);
        })
        await Ingredient.bulkCreate(tempIngrident,
          {
            where: { itemId: id },
            updateOnDuplicate: ["itemId"]
          }, { transaction: t })
  
        await t.commit()
      }

      response.status(200).json({ message: 'success update' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}


module.exports = AdminController