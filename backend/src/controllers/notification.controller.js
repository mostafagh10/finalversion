const Notification = require('../models/notification.model')

const createNotification = async (req, res) => {
    try {
        const notification = new Notification({ ...req.body })
        await notification.save()
        res.status(200).send(notification)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    createNotification
}