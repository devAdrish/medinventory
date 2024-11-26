import { useState } from "react";
import TextEditor from "./TextEditor";
import AutoComplete from "./AutoComplete";

const AddItem = () => {
  const [conditions, setConditions] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [usage, setUsage] = useState("");

  const items: Medicine[] = [
    { id: 0, name: "Panadol" },
    { id: 1, name: "Ezomol 40mg" },
    { id: 2, name: "Ibuprufen 200mg" },
    { id: 3, name: "Levopraid" },
    { id: 4, name: "Arinac Forte" },
  ];

  return (
    <div className="flex flex-wrap">
      <TextEditor className="mx-2" onChange={setConditions} />
      <AutoComplete className="max-w-[300px]" items={items} onChange={setMedicines} />
      <TextEditor className="mx-2" onChange={setUsage} />
    </div>
  );
};

export default AddItem;
