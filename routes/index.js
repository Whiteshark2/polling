const express=require('express')
const router=express.Router()

router.use('/user',require('./user'))
router.use('/poll',require('./poll'))
router.use('/comment',require('./comment'))


module.exports=router