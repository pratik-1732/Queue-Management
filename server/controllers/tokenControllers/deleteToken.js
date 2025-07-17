import Token from "../../models/token.js";

const deleteToken = async (req, res) => {
  try {
    const id = req.params.id;

    const token = await Token.findById(id);

    if (!token || token.status === "cancelled")
      return res.status(400).json({ error: "cann't cancel token" });

    token.status = "cancelled";
    token.cancelled = new Date();
    await token.save();

    res.json({ message: "Token cancelled", token });
  } catch (error) {
    res.status(500).json({ error: "Error cancelling token" });
  }
};

export default deleteToken;
