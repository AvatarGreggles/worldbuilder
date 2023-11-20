"use client";

import { useState, useEffect } from "react";

import Card from "@components/Card";

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 card_layout">
      {data.map((lore) => (
        <Card key={lore._id} lore={lore} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [lores, setLores] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchLores = async () => {
      const res = await fetch("/api/lore");
      const data = await res.json();
      setLores(data);
    };

    fetchLores();
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
      {lores.length > 0 && <CardList data={lores} handleTagClick={() => {}} />}
    </section>
  );
};

export default Feed;
