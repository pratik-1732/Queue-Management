import Queue from "../../models/queue.js";
import Token from "../../models/token.js";

const addToken = async (req, res) => {
  try {
    const { TName } = req.body;
    const { queueId } = req.params;

    const count = await Token.countDocuments({ queueId }, { staus: "waiting" });
    const position = count + 1;
    const number = `Token ${position}`;

    const NewToken = await Token.create({
      name: TName,
      number,
      position,
      queueId,
    });

    await NewToken.save();
    await Queue.findByIdAndUpdate(
      queueId,
      {
        $push: { tokens: NewToken._id },
      },
      { new: true }
    );
    res.status(200).json({ message: "token created successfully" }, NewToken);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create token" }, error);
  }
};

export default addToken;
