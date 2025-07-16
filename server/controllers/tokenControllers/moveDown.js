import Token from "../../models/token.js";

const moveDown = async (req, res) => {
  try {
    const id = req.params.id;

    const token = await Token.findById(id);

    const below = await Token.findOne({
      queueId: token.queueId,
      position: token.position + 1,
    });

    if (below) {
      const temp = token.position;
      token.position = below.position;
      below.position = temp;

      await token.save();
      await below.save();

      res.json({ message: "Moved down", token });
    } else {
      res.json({ error: "cann't move down" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error moving down" });
  }
};

export default moveDown;
