"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditProject = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    tag: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      console.log(projectId);
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();

      setPost({
        title: data.title,
        content: data.content,
        tag: data.tag,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!projectId) return alert("No project id found");

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateProject}
    />
  );
};

export default EditProject;
