"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

import React from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/projects`);
      const data = await res.json();
      setProjects(data);

      console.log(data);
    };

    if (session?.user.id) {
      fetchProjects();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-project?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this project?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/projects/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);

        console.log(posts);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page!"
      projects={projects}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
