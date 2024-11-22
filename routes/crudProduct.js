const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/allProduct', (req, res) => {
    const selectAllProducts = "select  produit.id_produit, produit.libelle as libelle_produit, produit.prix, produit.description, produit.image, categorie.libelle as libelle_categorie from produit inner join categorie on produit.id_categorie = categorie.id_categorie;";
    db.query(selectAllProducts, (error, result) => {
        if (error) throw error;
        res.render('homepage', { crudProduct: result });
    });
});

router.get('/getProduct/:id', (req, res) => {
    const selectProduct = 'select * from produit where id_produit = ?;'
    db.query(selectProduct, [req.params.id], (error, result) => {
        if (error) throw error;
        res.render('updatePage', { updateProduct: result[0] });
    });
});

router.post('/update/:id', (req, res) => {
    const { prix, image, } = req.body;
    const id = req.params.id;
    const updateProduct = "update produit set prix = ?, image =? where id_produit = ?;";
    db.query(updateProduct, [prix, image, id], (error, result) => {
        if (error) throw error;
        res.redirect('/product/allProduct');
    });
});

router.get('/deleteProduct/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deleteProduct = 'delete from produit where id_produit = ?;';
    db.query(deleteProduct, [id], (error, result) => {
        if (error) throw error;
        res.redirect('/product/allProduct');

    });
});


router.get('/getCategoryForAddingProduct', (req, res) => {
    const selectCategories = "select * from categorie;";
    db.query(selectCategories, (error, result) => {
        if (error) throw error;
        res.render('insertpage', { categories: result });
    });
});

router.post('/insertProduct', (req, res) => {
    const {libelle, prix, description, image, id_categorie} = req.body;
    const insertProduct = "insert into produit (libelle, prix, description, image, id_categorie) values (?, ?, ?, ?, ?);";
    db.query(insertProduct, [libelle, prix, description, image, id_categorie], (error, result) => {
        if (error) throw error;
        res.redirect('/product/allProduct');
    });
});


module.exports = router;