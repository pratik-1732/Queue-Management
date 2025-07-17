import User from "../models/user.js";

const dashboardController = async (req, res) => {
  try {
    const { userId } = req.params;
  
    const displayUser = await User.findById(userId).populate("queues");
    if (!displayUser) return res.status(400).json({ error: "user not found" });

    res.status(200).json({
      name: displayUser.name,
      queues: displayUser.queues,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default dashboardController;
