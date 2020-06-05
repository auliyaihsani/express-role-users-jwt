const db = require("../models");
const Customers = db.customers;

// Create and Save a new Customers
exports.createCustomers = (req, res) => {
   if (!req.body.nama) {
       res.status(400).send({ message:"content canot be empty" });
       return;
   } 

   const customers = new Customers({
       nama: req.body.nama,
       alamat: req.body.alamat,
       email:req.body.email,
       tlp: req.body.tlp
   });

   customers.save(customers)
   .then((data) => {
       res.status(200).json(data);
   }).catch((err) => {
       res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Customers."
       });
   });
  
};

// Retrieve all Customers from the database.
exports.findAllCustomers = (req, res) => {
    const nama = req.query.nama;
    const condition = nama ? { nama: { $regex: new RegExp(nama), $options: "i" } } : {};


    Customers.find(condition)
              .then((data) => {
                  res.send(data);
              }).catch((err) => {
                  res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving customers."
                  });
              });
  };



// Find a single Customers with an id
  exports.findOneCustomers = (req, res) => {
    const id = req.params.id;
  
    Customers.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Customers with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Customers with id=" + id });
      });
  };



// update Customers with an id

exports.updateCustomers = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
          });
    }

    const id = req.params.id;

    Customers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Customers with id=${id}. Maybe Tutorial was not found!`
            });
            
        }else res.send({
            message: "customers was updated successfully"
        })
    }).catch((err) => {
        res.status(500).send({
            message: "error updating Customers with id ="+id
        });
    });
}


exports.deleteCustomersById = (req, res) =>{
    const id = req.params.id;

    Customers.findByIdAndRemove(id)
    .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Customers with id=${id}. Maybe Customers was not found!`
            });
        }else{
            res.send({
                message: "Customers was deleted successfully!"
              });
        }
    }).catch((err) => {
          
        res.status(500).send({
            message: "Could not delete customers with id=" + id
        });


    });


}


exports.deleteAllCustomers = (req, res) => {
    Customers.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} customes were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      });
  };









