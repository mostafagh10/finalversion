
const router = require('express').Router()
const Admin = require('../models/admin.model')
const authAdmin = require('../middlewares/authAdmin')
const { generateToken } = require('../Utils/helpers')
const { sendPasswordVerificationCode } = require('../emails/mailer')
const bcrypt = require('bcrypt')

// to get all admins 
router.get('/',/*  authAdmin, */ async (req, res) => {
    try {
      const admins = await Admin.find()
      res.status(200).send(admins)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })
  
  // to get an admin 
  router.post('/me', authAdmin, async (req, res) => {
    try {
      res.status(200).send(req.admin)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })
  
 // to get an admin 
router.get('/:id', /* authAdmin, */ async (req, res) => {
    const {id} = req.params
    try {
        const admin = await Admin.findById(id)
        if(!admin){
            return res.status(404).send()
        }
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})
  
  // to get an admin by name
  router.get('/find',/* authAdmin, */ async (req, res) => {
    let name;
    if (req.query.name){
      name = req.query.name
    }else{
      res.status(404).send("admin name is missing")
    }
    try {
      const admin = await Admin.findBy({ name })
      if(!admin){
        res.status(404).send("admin not found")
      }
      res.status(200).send(admin)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })
  
// to add a new admin 
router.post('/addnewadmin', async (req, res) => {
    try {
        const exist = await Admin.findOne({email : req.body.email})

        if(exist){
            return res.status(400).json({
                error:'this email already exists'
            })
        }
        const admin = new Admin({ ...req.body })
        await admin.save()
        res.status(200).send({ admin })
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})
  
  // to login as an admin
  router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const admin = await Admin.findByCredentials(email, password)
      admin.lastLogin = new Date()
      const token = await admin.generateAuth()
  
      res.status(200).send({ admin, token })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })
  
// to edit an admin 
router.patch('/:id',/* authAdmin, */ async (req, res) => {
    const updates = Object.keys(req.body)
    const {id} = req.params
    console.log("req.body : ",req.body)
    console.log("id : ",id)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))
    if(!isAllowed){
        throw new Error()
    }
    try {
        const admin = await Admin.findById(id)
        if(!admin){
            res.status(404).send('not found an admin')
        }
        updates.forEach(update => admin[update] = req.body[update])
        await admin.save()
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})
  
// to delete an admin 
router.delete('/:id',/* authAdmin, */ async (req, res) => {
    const { id } = req.params
    try {
        await Admin.findByIdAndDelete(id)
        res.status(200).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
  
// to logout from a device
router.post('/logout', authAdmin, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter(token => req.token !== token.token)
        await req.admin.save()
        res.status(200).send({msg:"the admin logged out"})
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
  
// to logout from all devices
router.post('/logout-all', authAdmin, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})
  
  router.post('/password/forget', async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin){
      return res.status(404).send("admin is not found")
    }
    if (admin.verificationCode) {
      sendPasswordVerificationCode(admin.email, admin.firstName , 'admin', admin.verificationCode)
    } else {
    admin.verificationCode= await generateToken(4)
    sendPasswordVerificationCode(admin.email, admin.firstName , 'admin', admin.verificationCode )
    await admin.save()
  }
  res.status(200).send()
  })
  
  router.post('/password/code/verification', async (req, res) => {
    const { verificationCode, email } = req.body
    try {
      const admin = await Admin.findOne({ email })
      if (!admin) {
        return res.status(400).send("not find a admin")
      }
      if(verificationCode!== admin.verificationCode){
        return res.status(400).send("code is not valid")
      }
      admin.changePassword = true
      admin.verificationCode = undefined
      await admin.save()
      res.status(200).send()
    } catch (error) {
      res.status(500).send()
    }
  })
  
  // should send email, pass, confirm pass
  router.post('/password/reset', async (req, res) => {
    const { email, password, confirmPassword } = req.body
    console.log(email, password, confirmPassword);
    const admin = await Admin.findOne({ email })
    if (!admin) {
      res.status(400).send("not find a admin")
    }
    if (!admin.changePassword) {
      res.status(400).send("forget req first")
    }
    if (password !== confirmPassword) {
      res.status(400).send("not matched")
    }
    admin.password = password
    admin.changePassword = false
    await admin.save()
    res.status(200).send()
  })
  
  
  module.exports = router