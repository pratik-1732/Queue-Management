import Token from "../../models/token.js";

const addToken = async (req, res) => {
  try {
    const { name } = req.body;
    const { queueId } = req.params;

    const count = await Token.countDocuments({ queueId }, { staus: "waiting" });
    const position = count + 1;
    const number = `Token ${position}`;

    const token = await Token.create({
      name,
      number,
      position,
      queueId,
    });

    await token.save();
    res.status(200).json({ message: "token created successfully" }, token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create token" }, error);
  }
};

export default addToken;
