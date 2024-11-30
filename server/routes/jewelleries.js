var express = require('express');
var router = express.Router();
let Jewelleries = require('../model/jewelleries')
const jewelleries = require('../model/jewelleries');
let jewelleriesController = require('../controllers/jewelleries.js')

router.get('/',async(req,res,next)=>{
    try{
        const JewelleriesList = await Jewelleries.find();
        res.render('Jewelleries/list',{
            title:'Jewellery',
            displayName: req.user ? req.user.displayName: '',
            JewelleriesList:JewelleriesList
        })
    }
    catch(err){
        console.error(err)
        res.render('Jewelleries/list',{
            error:'Error on Server'})
    }
})
/* Create operation --> Get route for displaying the Add Page */
router.get('/add', async(req, res,next) => {
    try {
        res.render('Jewelleries/add',{
            title: 'Add Jewellery',
            displayName: req.user ? req.user.displayName: ''
        });
    }
    catch(err)
    {
        console.error(err)
        res.render('Jewelleries/list',{
            error:'Error on Server'})
    }
});
/* Create Operation --> Post route for Processing the Add Page */
router.post('/add', async(req, res,next) => {
    try {
        let newJewelleries = Jewelleries({
            "product": req.body.product,
            "category": req.body.category,
            "price": req.body.price,
            "color": req.body.color,
            "metal": req.body.metal,
            "size": req.body.size
        });
        Jewelleries.create(newJewelleries).then(()=> {
            res.redirect('/jewellerieslist');
        })

    }
    catch(err)
    {
        console.error(err)
        res.render('Jewelleries/list',{
            error:'Error on Server'})
    }
});
/* Update operation --> Get route for displaying the Edit Page */
router.get('/edit/:id',async(req, res,next) => {
    try {

        const id = req.params.id;
        const jewelleriesToEdit = await Jewelleries.findById(id);
        res.render('Jewelleries/edit',
            {
                title: 'Edit Jewellery',
                displayName: req.user ? req.user.displayName: '',
                Jewelleries:jewelleriesToEdit
            }
        )

    }
    catch(err)
    {
        console.error(err)
        next(err); //passing the error
    }
});
/* Update Operation --> Post route for Processing the Edit Page */
router.post('/edit/:id',async(req, res,next) => {
    try {
        let id=req.params.id;
        let updatedJewelleries = Jewelleries({
            "_id":id, 
            "product":req.body.product,
            "category":req.body.category,
            "price":req.body.price,
            "color":req.body.color,
            "metal":req.body.metal, 
            "size": req.body.size
        })
        Jewelleries.findByIdAndUpdate(id, updatedJewelleries).then(()=>{
            res.redirect('/jewellerieslist')
        })
    }

    catch(err)
    {
        console.error(err)
        res.render('Jewelleries/list',{
            error:'Error on Server'})
    }
});
/* Delete Operation --> Get route to perform Delete operation */
router.get('/delete/:id',async(req, res, next) => {
    try{
        let id=req.params.id;
        Jewelleries.deleteOne({_id:id}).then(()=>{
            res.redirect('/jewellerieslist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Jewelleries/list',{
            error:'Error on Server'})
    }
});
module.exports = router;