import { connectToDB } from "@utils/database";
import Project from "@models/project";

export const POST = async (req) => {
  const { creator, title, content, tag } = await req.json();

  try {
    await connectToDB();

    const newProject = new Project({
      creator,
      title,
      content,
      tag,
    });

    await newProject.save();

    return new Response(JSON.stringify(newProject), {
      status: 201,
    });
  } catch (err) {
    return new Response("Failed to create new project", {
      status: 500,
    });
  }
};
