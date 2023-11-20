import { connectToDB } from "@utils/database";
import Lore from "@models/lore";

export const POST = async (req) => {
  const { creator, title, content, tag } = await req.json();

  try {
    await connectToDB();

    const newLore = new Lore({
      creator,
      title,
      content,
      tag,
    });

    await newLore.save();

    return new Response(JSON.stringify(newLore), {
      status: 201,
    });
  } catch (err) {
    return new Response("Failed to create new lore", {
      status: 500,
    });
  }
};
