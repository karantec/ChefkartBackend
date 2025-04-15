
const Service = require("../models/Services.Model");

const createServices = async (req, res) => {
  try {
    const {servicename,description ,image} = req.body;


    //check for the duplicated
     const existingServices= await Service.findOne({ servicename });


      if(existingServices){
        return res.status(400).json({
          message: "Service already exists",
        });
      }
    // validation process
    
    
    
    
    
    if (!servicename || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newService = new Service({
      servicename,
      description,
      image
    });
    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//ge all gallery
const getAllServices = async (req, res) => {
  try {
    const Services = await Service.find();

    res.status(200).json(Services);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteServices = async (req, res) => {
    try {
      const Services=await Service.deleteMany();
     
  
      res.status(200).json({
        message: "Services deleted successfully",
      data: Services
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    createServices,
    getAllServices,
    deleteServices

};
