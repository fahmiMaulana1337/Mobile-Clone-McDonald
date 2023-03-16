const { hash, compare, encodeToken } = require('../helpers/helper');
const { User, Item,Ingredient,Category } = require('../models/index')
class UserController {
    static async register(req, response) {
        try {
            const { email, password } = req.body;

            if (!password) {
                throw { required: "Password is Required" };
            }
            const user = await User.create({
                email,
                password: hash(password),
                role: 'User'
            });
            response.status(201).json({ id: user.id, email: user.email });
        } catch (error) {
            console.log(error);
            if (error.name === "SequelizeValidationError") {
                response.status(400).json(error.errors[0].message);
            } else if (error.required) {
                response.status(400).json(error);
            } else if (error.name === "SequelizeUniqueConstraintError") {
                response.status(400).json(error.errors[0].message);
            } else {
                response.status(500).json(error.message);
            }
        }
    }
    static async login(req, response) {
        try {
            const { email, password } = req.body;

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
            response.status(401).json(err)
        }
    }

    static async getItem(req, response) {
        try {
            const data = await Item.findAll({})
            response.status(200).json(data)
        } catch (error) {
            console.log(error)
            response.status(500).json(error);
        }
    }

    static async detailItem(req, response) {
        try {
            const id = req.params.id

            const data = await Item.findOne({
                include:[Ingredient,Category],               
                where: {
                    id
                }
            })
            response.status(200).json(data)
        } catch (error) {
            console.log(error)
            response.status(500).json(error)
        }
    }

}


module.exports = UserController