// Get

// Patch

// Delete

import { connectToDB } from "@utils/database";
import Project from "@models/project";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const project = await Project.findById(params.id);

    if (!project) {
      return new Response("Project not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(project), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all Project", {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { title, content, tag } = await req.json();

  try {
    await connectToDB();

    const existingProject = await Project.findById(params.id);

    if (!existingProject) {
      return new Response("Project not found", {
        status: 404,
      });
    }

    existingProject.title = title;
    existingProject.content = content;
    existingProject.tag = tag;

    await existingProject.save();

    return new Response(JSON.stringify(existingProject), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to update project", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    console.log("Params ID:", params.id);

    await Project.findByIdAndDelete(params.id);

    return new Response("Project deleted successfully", {
      status: 200,
    });
  } catch (err) {
    console.error("Error in DELETE /api/project/[id]:", err);
    return new Response("Failed to delete project", {
      status: 500,
    });
  }
};
