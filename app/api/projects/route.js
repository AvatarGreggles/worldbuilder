import { connectToDB } from "@utils/database";
import Project from "@models/project";

export const revalidate = 0; // this is the new line added

export const GET = async (req) => {
  try {
    await connectToDB();

    const projects = await Project.find({});
    return new Response(JSON.stringify(projects), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all projects", {
      status: 500,
    });
  }
};
