const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalExpense: {
    type: Number,
    required: true,
  },
  isPremium: {
    type: Boolean,
    required: true,
  },
  order: {
    orders: [
      {
        paymentid: {
          type: String,
        },
        orderid: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.createOrder = function (orderid, status) {
  let obj = {
    orderid: orderid,
    paymentid: null,
    status: status,
  };
  console.log(obj, "this is order");
  let updatedorders;
  if (this.order.orders) {
    updatedorders = [...this.order.orders];
    updatedorders.push(obj);
  } else {
    updatedorders = [];
    updatedorders.push(obj);
  }
  console.log("working");
  const updated = {
    orders: updatedorders,
  };
  console.log(updated, "this is updated");
  this.order = updated;
  this.save(); 
  
};

userSchema.methods.updateOrder = async function (orderid, paymentid, status) {
  const index = this.order.orders.findIndex(
    (order) => order.orderid === orderid
  );
  if (index === -1){
    throw new Error("Order not found");
  }
  this.order.orders[index].paymentid = paymentid;
  this.order.orders[index].status = status;
  await this.save();
  this.isPremium = true;
  await this.save();
  return this.order.orders[index];
};

module.exports = mongoose.model("User", userSchema);
