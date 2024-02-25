const Category = require(".././models/categories.model");
const router = require("express").Router();
router.get("/get_categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).send({ msg: `${error.message}` });
  }
});
router.post("/post_categories", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).send({ newCategory });
  } catch (error) {
    res.status(500).send({ msg: `${error.message}` });
  }
});
router.delete("/delete_categories/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const deleteCategory=await Category.findByIdAndDelete(id);
        if(!deleteCategory){
            return res.status(404).send({msg:`User not found`});
        }else{
            return res.status(200).send({msg:`Category deleted successfully`});
        }
    }catch(error){
        return res.status(404).send({msg:`${error.message}`});
    }
});
module.exports = router;
