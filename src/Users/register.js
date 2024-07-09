const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../../modules/dbconect');
const { ObjectId } = require('mongodb');

router.post('/', async (req, res) => {
    try {
        const { email, password, name, lastname, cellphone, idcard } = req.body;
        const db = await connectToDatabase();
        const InsertClient = db.collection("costumers");
        const body = {
            mail: email,
            password: password,
            name: name,
            lastname: lastname,
            phone: cellphone,
            Idcard: idcard
        }
        const result = await InsertClient.insertOne(body);
        res.status(201).json("client successfully created");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:item_valueid', async (req, res) => {
    const { item_valueid } = req.params;
    try {
        const db = await connectToDatabase();
        const InformationUser = db.collection("costumers");
        const result = await InformationUser.find({_id: new ObjectId(item_valueid)}).toArray();
        const id = result[0].Idcard;
        
        if(result.length){  
            res.status(201).json(id);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;