import Token from "../models/token.js";

const TotalTimeAvg = (TotalWaitTimes) => {
  let sum = 0;
  for (let i = 0; i < TotalWaitTimes.length; i++) sum += TotalWaitTimes[i];

  return (sum / TotalWaitTimes.length).toFixed(2);
};

const analyticsController = async (req, res) => {
  try {
    const { queueId } = req.params;

    const tokens = await Token.find({ queueId });

    if (!tokens)
      return res.status(400).json({ error: "error in token accessing" });

    const total = tokens.length;
    const waiting = tokens.filter((token) => token.status === "waiting").length;
    const assigned = tokens.filter(
      (token) => token.status === "assigned"
    ).length;
    const cancelled = tokens.filter(
      (token) => token.status === "cancelled"
    ).length;

    const assignedTokens = tokens.filter(
      (token) => token.status === "assigned" && token.assignAt
    );

    const TotalWaitTimes = assignedTokens.map((AT) => {
      return (AT.assignAt - AT.createdAt) / (1000 * 60);
    });

    const avgWaitTime = TotalWaitTimes.length
      ? TotalTimeAvg(TotalWaitTimes)
      : "0.00";

    res.json({
      totalTokens: total,
      assignedTokens: assigned,
      cancelledTokens: cancelled,
      waitingTokens: waiting,
      averageWaitTimeInMinutes: avgWaitTime,
    });
  } catch (error) {
    res.status(500).json({ error: "Analytics calculation failed" });
  }
};

export default analyticsController;
