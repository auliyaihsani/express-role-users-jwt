module.exports = app => {
    const customersController = require("../controllers/controller.customers");
    const { authJwt } = require("../middleware");

    var router = require("express").Router();
  
    // Create a new Customers
    router.post("/",   [authJwt.verifyToken, authJwt.isAdmin], customersController.createCustomers);
  
    // Retrieve all Customers
    router.get("/",   [authJwt.verifyToken, authJwt.isOwner], customersController.findAllCustomers);
  
   
    // Retrieve a single Customers with id
    router.get("/:id", customersController.findOneCustomers);
  
    //  Update a Customers with id
    router.put("/:id", customersController.updateCustomers);
  
    // Delete a Tutorial with id
    router.delete("/:id", customersController.deleteCustomersById);
  
    // Create a new Tutorial
    router.delete("/", customersController.deleteAllCustomers);
  
    app.use('/api/customers', router);
  };