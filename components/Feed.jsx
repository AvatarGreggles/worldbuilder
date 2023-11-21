"use client";

import { useState, useEffect } from "react";

import Card from "@components/Card";

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 card_layout">
      {data.map((project) => (
        <Card
          key={project._id}
          data={project}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {projects.length > 0 && (
        <CardList data={projects} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
