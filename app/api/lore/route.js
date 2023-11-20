import { connectToDB } from "@utils/database";
import Lore from "@models/lore";

export const GET = async (req) => {
  try {
    await connectToDB();

    const lores = await Lore.find({});
    return new Response(JSON.stringify(lores), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all lore", {
      status: 500,
    });
  }
};
