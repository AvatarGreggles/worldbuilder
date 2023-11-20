import Card from "@components/Card";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 card_layout">
        {data.map((lore) => (
          <Card
            key={lore._id}
            lore={lore}
            handleEdit={() => handleEdit && handleEdit(lore)}
            handleDelete={() => handleDelete && handleDelete(lore)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
