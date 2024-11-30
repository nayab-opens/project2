// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let jewelleriesModel = mongoose.Schema({
    product:String,
    category:String,
    price:String,
    color:String,
    metal:String,
    size:String
},
{
    collection:"jewellery_collection"
}
)
module.exports = mongoose.model('jewelleries', jewelleriesModel)