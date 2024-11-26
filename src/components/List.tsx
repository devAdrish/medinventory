import { useState } from "react";

const List = () => {
  //   const [data, setData] = useState<JObj[]>([]);
  const data = [
    { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", age: 35, email: "mike@example.com" },
  ];

  return (
    <table border={1} style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Conditions</th>
          <th>Medicines</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
