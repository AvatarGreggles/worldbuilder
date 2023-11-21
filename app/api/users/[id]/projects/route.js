import { connectToDB } from "@utils/database";
import Project from "@models/project";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const projects = await Project.find({ "creator.id": params.id });

    return new Response(JSON.stringify(projects), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch your project", {
      status: 500,
    });
  }
};
