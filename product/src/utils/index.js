import amqplib from "amqplib";
import { MSG_QUEUE_URL, QUEUE_NAME } from "../../config.js";

export const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, "direct", { durable: true });
    return channel;
  } catch (error) {
    throw error;
  }
};
