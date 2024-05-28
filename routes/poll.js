const express=require('express')
const router=express.Router()
const auth=require('../config/auth')
const {createPoll,getPolls,getPoll,vote}=require('../controller/pollControllers')



router.post('/', auth, createPoll);
router.get('/', getPolls);
router.get('/:id', getPoll);
router.post('/:id/vote', auth, vote);

module.exports=router