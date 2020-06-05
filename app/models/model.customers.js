 module.exports = mongoose => {
    const schema = mongoose.Schema(
      {
        // _id: mongoose.Schema.Types.ObjectId,
          nama: String,
          alamat: String,
          email: String,
          tlp: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _idcustomers, ...object } = this.toObject();
      object.id = _idcustomers;
      return object;
    });
  
    const Customers = mongoose.model("customers", schema);
    return Customers;
  };