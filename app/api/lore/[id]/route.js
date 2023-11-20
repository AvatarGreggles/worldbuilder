// Get

// Patch

// Delete

import { connectToDB } from "@utils/database";
import Lore from "@models/lore";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const lore = await Lore.findById(params.id);

    if (!lore) {
      return new Response("Lore not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(lore), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all lore", {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { title, content, tag } = await req.json();

  try {
    await connectToDB();

    const existingLore = await Lore.findById(params.id);

    if (!existingLore) {
      return new Response("Lore not found", {
        status: 404,
      });
    }

    existingLore.title = title;
    existingLore.content = content;
    existingLore.tag = tag;

    await existingLore.save();

    return new Response(JSON.stringify(existingLore), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to update lore", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    console.log("Params ID:", params.id);

    await Lore.findByIdAndDelete(params.id);

    return new Response("Lore deleted successfully", {
      status: 200,
    });
  } catch (err) {
    console.error("Error in DELETE /api/lore/[id]:", err);
    return new Response("Failed to delete lore", {
      status: 500,
    });
  }
};
