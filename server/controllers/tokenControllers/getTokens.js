import Token from "../../models/token.js";

const getTokens = async (req, res) => {

  try {
    const { queueId } = req.params;
    const tokens = await Token.find({ queueId }).sort({ position: 1 });
    res.status(200).json(tokens);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tokens" }, error);
  }
};

export default getTokens;
