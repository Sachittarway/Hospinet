const express=require('express');
const bcrypt=require('bcryptjs');
const {User}  = require('../models/register');
const {prescriptionss} = require('../models/prescription')
const { Patient } = require('../models/patient');
const router=express.Router();
 
router.post('/add',async(req,res)=>{
    try {
        const { username, email, password } = req.body;
        console.log(username)
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
          return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
          return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        return res.json({ status: true, user });
    } 
    catch (ex) {
        console.log(ex)
        next(ex);
    }
})
   
router.post('/login', async(req,res) =>{
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        return res.json({ status: true, user });
    } 
    catch (ex) {
        next(ex);
    }

})

router.post('/prescription',async(req,res)=>{
    try {
        const { ex1,inputs } = req.body;
        //console.log(inputs);
        //console.log(ex1.patient_id);
        console.log(inputs);
        console.log("before patient");
        let patient_id = ex1.patient_id;
    
        let days = ex1.days;
        let note = ex1.note;
        const Prescriptionss = await prescriptionss.create({
            patient_id,
            days,
            note,
            inputs
        });
        console.log("After");
        return res.json({ status: true, Prescriptionss });
    } 
    catch (ex) {
        console.log("ex");
        next(ex);
    }
})

router.get('/getpres', async(req,res) =>{
    try{
        const pres = await prescriptionss.find();
        return res.json({ pres, status: true });
    }
    catch(ex){
        console.log(ex);
        next(ex);
    }
})

router.post('/patientAdd',async(req,res)=>{
    try {
        const { username, email, password } = req.body;
        console.log(username)
        const usernameCheck = await Patient.findOne({ username });
        if (usernameCheck)
          return res.json({ msg: "Username already used", status: false });
        const emailCheck = await Patient.findOne({ email });
        if (emailCheck)
          return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const patient = await Patient.create({
          username,
          email,
          password: hashedPassword,
        });
        return res.json({ status: true, patient });
    } 
    catch (ex) {
        console.log(ex)
        next(ex);
    }
})

router.post('/patientLogin', async(req,res) =>{
    try{
        const { username, password } = req.body;
        const user = await Patient.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        return res.json({ status: true, user });
    } 
    catch (ex) {
        next(ex);
    }

})

module.exports=router ;