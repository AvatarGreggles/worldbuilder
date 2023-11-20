import { connectToDB } from "@utils/database";
import Lore from "@models/lore";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const lores = await Lore.find({ "creator.id": params.id });

    return new Response(JSON.stringify(lores), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch your lore", {
      status: 500,
    });
  }
};
