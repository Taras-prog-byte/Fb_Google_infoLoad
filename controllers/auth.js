const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const model = require('../models/tokens')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res){
    const candidate = await User.findOne({email:req.body.email})

    if (candidate){
        //перевірка паролю, юзер інсує
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //генеруємо токен, одинакові паролі
            const token = jwt.sign({
                email: candidate.email,
                userID: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else {
            //паролі не збіглися
            res.status(401).json({
                message:'Wrong email or password'
            })
        }
    }else {
        //ористувача немає, помилка
        res.status(404).json({
            message: 'Wrong email or password',
        })
    }
}

module.exports.register =  async function (req, res){
    //email password
    const candidate = await User.findOne({email:req.body.email});

    if (candidate){
        //користувач існує,треба повернути помилку
        res.status(409).json({
            message: 'Such email had been already registered'
        })
    }else {
        //створюємо користувача
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save()
            res.status(201).json(user)
        }catch (e){
            //оброка помилки
            errorHandler(res, e);
        }
    }
}

module.exports.profile = async function (req, res){
    res.json({message:'Tokens is here'})
}