const Product = require("../models/products.model");
const express = require("express");
const router = express.Router();

router.get("/get_products", async (req, res) => {
    try {
        const { filter, value } = req.query;
        const products = await Product.find({});
        if (!filter || !value) {
            return res.status(200).send(products);
        } else {
            const filteredProducts = products.filter(product => {
                return product[filter] && product[filter].toLowerCase().includes(value.toLowerCase());
            });
            return res.status(200).send(filteredProducts);
        }
    } catch (error) {
        return res.status(500).send({ msg: `${error.message}` });
    }
});
 
router.post("/post_products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(200).send(newProduct);
  } catch (error) {
    return res.status(400).send({ msg: `${error.message}` });
  }
});


router.put("/update_products/:product_name",async (req,res) =>{
    try{
        const { product_name } = req.params;
        const updatedProducts = req.body;

        const product = await Product.findOneAndUpdate(
            {name:product_name},
            updatedProducts,
            {new:true}
        )

        if(!product){
            return res.status(404).send({msg:"Product not found"})
        }
        
        return res.status(200).send(product);
    }catch(error){
        res.status(500).send({msg:`${error.message}`});
    }

} )


router.delete("/delete_products/:id",async(req,res)=>{
    const { id } = req.params;

    try{
        const deleteProduct = await Product.findByIdAndDelete(id);

        if(!deleteProduct){
            return res.status(404).send({msg:"Product not found"});
        }else{
            return res.status(200).send({
                msg:"Product deleted successfully"
            })
        }

    }catch(error){
        return res.status(404).json({msg:`${error.message}`});
    }

})


module.exports = router;
