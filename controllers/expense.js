const Expense = require("../models/expense");
const User = require("../models/user");
const S3services = require("../services/S3services");
const DownloadFiles = require("../models/downloadFiles");

exports.postAddExpense = async (req, res) => {
  try {
    let category = req.body.category;
    let description = req.body.description;
    let amount = req.body.amount; 
    let date = req.body.date;

    let totalExpense = req.user.totalExpense;

    totalExpense += Number(amount);

    let expense = new Expense({
      category: category,
      description: description,
      amount: amount,
      date: date,
      userId: req.user._id,
    });
    let result = await expense.save(); 
   
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { totalExpense: totalExpense }
    );
    res.status(200).json({
      expense: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getExpenses = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  try {
    const totalExpenses = await Expense.countDocuments({
      userId: req.user._id,
    });

    // const totalPages = Math.ceil(totalExpenses / pageSize);
    // console.log(totalPages);

    let expenses = await Expense.find({ userId: req.user._id })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(202).json({
      expenses: expenses,
      currentPage: page,
      hasPreviousPage: page > 1,
      hasNextPage: page * pageSize < totalExpenses,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalExpenses / pageSize),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    let totalExpense = req.user.totalExpense;
    let expense = await Expense.findById({ _id: req.params.id });
    let amount = expense.amount;

    totalExpense = totalExpense - amount;

    await Expense.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Expense successfully deleted.",
    });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { totalExpense: totalExpense }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

exports.getLeaderBoard = async (req, res) => {
  try {
    
    let users = await User.aggregate([
      {
        $group: {
          _id: `$_id`,
          name: { $first: `$name` },
          email: { $first: `$email` },
          totalExpense: { $sum: `$totalExpense` },
        },
      },
      {
        $sort: {
          totalExpense: -1, 
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          totalExpense: 1,
        },
      },
    ]);

    res.status(202).json({
      users: users,
    });
  } catch (error) {}
};

exports.downloadExpense = async (req, res) => {
  try {
    let userId = req.user._id;
    let expenses = await Expense.find({ userId: userId });
    let stringifyExpenses = JSON.stringify(expenses);
    let fileName = `${new Date().toLocaleDateString()}/${req.user.name}`;
    let fileURL = await S3services.uploadToS3(stringifyExpenses, fileName);
    console.log(fileName, fileURL, "URL check");

    let obj = new DownloadFiles({
      url: fileURL,
      fileName: fileName,
      userId: userId,
    });
    await obj.save();
    res.status(202).json({
      fileUrl: fileURL,
      fileName: fileName,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.downloadHistory = async (req, res) => {
  try {
    let userId = req.user._id;
    let files = await DownloadFiles.find({ userId: userId });

    res.status(202).json({
      files: files,
    });
  } catch (error) {
    console.log(error);
  }
};
