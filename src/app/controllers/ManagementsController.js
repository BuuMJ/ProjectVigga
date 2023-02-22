const Category = require('../models/Category');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class ManagementsController {
    
    // [GET] category
    category(req, res, next) {
        //res.render("category");
        // [Read Category]
        Category.find({})
            .then(category => {
                category = category.map(category => category.toObject())
                res.render("category", {category});
            })
            .catch(next);
    }


    //[GET] Category]
    create(req, res, next){
        // res.json(req.body);
        res.render("create");
    }

    //[POST] Create Category
    store(req,res, next){
        const category = new Category(req.body);
        category.save()
        .then(() => res.redirect("category"))
        .catch(error => {});
    }

    //[GET] Edit category
    edit(req, res, next){
        Category.findById(req.params.id)
        .then( category => res.render("edit", {
            category: mongooseToObject(category)
        }))
        .catch(next);
    }

    //[PUT] Update category
    update(req, res, next){
        Category.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect("category"))
        .catch(error => {});
    }

    //[DELETE] delete category
    delete(req, res, next){
        Category.deleteOne({_id: req.params.id}, req.body)
        .then(() => res.redirect("category"))
        .catch(next);
    }


    // submission
    submission(req, res) {
        res.render("submission");
    }
    // department
    department(req, res) {
        res.render("department");
    }

}



module.exports = new ManagementsController;