import Queue from "../../models/queue.js";

const getTokens = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findById(queueId).populate({
      path: "tokens",
      options: { sort: { position: 1 } },
    });
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    res.status(200).json({ queueName: queue.name, tokens: queue.tokens });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get tokens" }, error);
  }
};

export default getTokens;
