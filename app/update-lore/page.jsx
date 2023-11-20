"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditLore = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loreId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    tag: "",
  });

  useEffect(() => {
    const getLoreDetails = async () => {
      console.log(loreId);
      const res = await fetch(`/api/lore/${loreId}`);
      const data = await res.json();

      setPost({
        title: data.title,
        content: data.content,
        tag: data.tag,
      });
    };

    if (loreId) getLoreDetails();
  }, [loreId]);

  const updateLore = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!loreId) return alert("No lore id found");

    try {
      const res = await fetch(`/api/lore/${loreId}`, {
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
      handleSubmit={updateLore}
    />
  );
};

export default EditLore;
