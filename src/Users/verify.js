const express = require ('express');
const router = express.Router();
const { connectToDatabase } = require('../../modules/dbconect');

router.get('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const db = await connectToDatabase();
        const VerifyUser = db.collection("costumers");
        const query = {
            mail: email
        }
        const result = await VerifyUser.find(query)
        .toArray();
        
        if(result.length){  
            res.status(404).json("E-mail already exists");
        }else{
            res.status(200).json("Ok")
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:email/:password', async(req, res) => {
    const { email } = req.params;
    const { password } = req.params;
    try {
        const db = await connectToDatabase();
        const VerifyUser = db.collection("costumers");
        const query = {
            mail: email,
            password: password
        }
        const result = await VerifyUser.find(query)
        .toArray();
        if(result.length){  
            res.status(200).send(result);
        }else{
            res.status(404).json("Incorrect Email or Password")
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});

module.exports = router;