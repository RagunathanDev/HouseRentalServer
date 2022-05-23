const mongoose = require("mongoose");

const houseDetailsSchema = mongoose.Schema({
  userId: {
    required: true,
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  squareFeet: {
    type: Number,
    required: true,
  },
  adminApproval: {
    type: Boolean,
    required: true,
    default: false,
  },
  requestUserDetails: [
    {
      userId: {
        type: Number,
      },
      name: {
        type: String,
      },
      mobileNumber: {
        type: Number,
      },
      email: {
        type: String,
      },
      ownerApproval: {
        type: Boolean,
        default: false,
      },
    },
  ],
  houseBookedStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("houseDetails", houseDetailsSchema);
