import Token from "../../models/token.js";

const assignToken = async (req, res) => {
  try {
    const id = req.params.id;

    const token = await Token.findById(id);

    if (!token || token.status !== "waiting")
      return res.status(400).json({ error: "invalid token selection" });

    token.status = "assigned";
    token.assignAt = new Date();
    await token.save();
    res.json({ message: "Token assigned", token });
  } catch (error) {
    res.status(500).json({ error: "Error assigning token" });
  }
};

export default assignToken;
