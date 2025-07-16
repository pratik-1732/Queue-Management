import Token from "../../models/token.js";

const moveUp = async (req, res) => {
  try {
    const id = req.params.id;

    const token = await Token.findById(id);

    if (!token || token.position === 1)
      return res.status(400).json({ error: "cannot move up" });

    const above = await Token.findOne({
      queueId: token.queueId,
      position: token.position - 1,
    });

    if (above) {
      const temp = token.position;
      token.position = above.position;
      above.position = temp;

      await token.save();
      await above.save();
      res.json({ message: "Moved up", token });
    } else {
      res.json({ error: "cann't move up" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error moving up" });
  }
};

export default moveUp;
