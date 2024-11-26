import { createRecord } from "./services";
import List from "./components/List";
import AddItem from "./components/AddItem";
import "./App.css";

function App() {
  const handleWrite = () => {
    createRecord("inventory", { name: "adrish", age: 31 });
  };

  return (
    <>
      <AddItem />
      <List />
    </>
  );
}

export default App;
