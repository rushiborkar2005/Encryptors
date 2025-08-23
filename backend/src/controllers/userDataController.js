import User from "../models/User.js";


// ✅ Add or update income
export const setIncome = async (req, res) => {
  try {
    const { income } = req.body;
    const userId = req.user._id; // from auth middleware

    let userData = await UserData.findOne({ user: userId });

    if (!userData) {
      userData = new UserData({ user: userId, income });
    } else {
      userData.income = income;
    }

    await userData.save();
    res.status(200).json({ message: "Income saved", data: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add expense
export const addExpense = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const userId = req.user._id;

    const userData = await UserData.findOne({ user: userId });

    if (!userData) {
      return res.status(404).json({ message: "User data not found" });
    }

    const expense = { amount, description };
    userData.expense_done.push(expense);

    // update lastExpenseAt each time expense is added
    userData.lastExpenseAt = new Date();

    await userData.save();
    res.status(200).json({ message: "Expense added", data: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await UserData.findOne({ user: userId });

    if (!userData) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
