import { useState } from "react";
import Items from "./Items";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  const AddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: name,
      description: description,
    };
    setItems([...items, newItem]);
    resetForm();
  };

  const RemoveItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const EditItem = (item) => {
    setName(item.name);
    setDescription(item.description);
    setIsEditing(true);
    setCurrentItemId(item.id);
  };

  const UpdateItem = () => {
    setItems(
      items.map((item) =>
        item.id === currentItemId
          ? { ...item, name: name, description: description }
          : item
      )
    );
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setIsEditing(false);
    setCurrentItemId(null);
  };

  const handleSubmit = () => {
    if (isEditing) {
      UpdateItem();
    } else {
      AddItem();
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <div>
        <input
          type="text"
          placeholder="item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>
          {isEditing ? "Update" : "Submit"}
        </button>
      </div>
      <Items items={items} RemoveItem={RemoveItem} EditItem={EditItem} />
    </div>
  );
}

export default App;
