const router = require('express').Router()
const {LoginInfo} = require('../model')

//getting all the login info
router.get('/login', async(req,res)=> {
    try {
        const loginstuff = await LoginInfo.findAll();
        res.json(loginstuff);
    }
    catch (err) {
        res.json(err);
    }
   
})

//creating new login info
router.post('/login', async({body}, res)=> {
    // try{
    //     const newLogin = await LoginInfo.create({
    //         email: req.body.email,
    //         password: req.body.password
    //     });
    //     res.json(newLogin);
    // }
    // catch (err) {
    //         console.log('hello')
    //     res.json(err);
    // }
    const log = await LoginInfo.create(body);
    res.json(log)
})

module.exports = router;
