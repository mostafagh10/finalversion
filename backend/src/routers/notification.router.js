
const router = require('express').Router()
const Notification = require('../models/notification.model')
const authUser = require('../middlewares/authUser')
const {
    createNotification
} = require('../controllers/notification.controller')


router.post('/' , createNotification)

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const notification = await Notification.find({userId : id}).sort({createdAt: -1})
        if(!notification){
            return res.status(404).send()
        }
        res.status(200).send(notification)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})



module.exports = router