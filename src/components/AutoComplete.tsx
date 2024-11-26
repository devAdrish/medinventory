import React, { useState, useRef } from "react";

type AutoCompleteProps = {
  items: Medicine[];
  onChange: (data: Medicine[]) => void;
  className?: string;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({
  items,
  onChange,
  className,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState<Medicine[]>([]);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setFocusIndex(0);
    setIsDropdownOpen(true);
  };

  const handleSelect = (item: Medicine) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      setSelectedItems((prev) => {
        const data = [...prev, item];
        onChange(data);
        return data;
      });
    }
    setSearchText("");
    setFocusIndex(0);
    inputRef.current?.focus();
  };

  const handleRemove = (item: Medicine) => {
    setSelectedItems((prev) => {
      const data = prev.filter((selected) => selected.id !== item.id);
      onChange(data);
      return data;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredItems.length) return;

    if (event.key === "ArrowDown") {
      setFocusIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (event.key === "ArrowUp") {
      setFocusIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (event.key === "Enter" && focusIndex >= 0) {
      handleSelect(filteredItems[focusIndex]);
    } else if (
      event.key === "Backspace" &&
      searchText === "" &&
      selectedItems.length
    ) {
      handleRemove(selectedItems[selectedItems.length - 1]);
    }
  };

  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
      setFocusIndex(0);
    }, 100);
  };

  const handleClick = () => {
    setIsDropdownOpen(true);
    setFocusIndex(0);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      !selectedItems.find((selected) => selected.id === item.id)
  );

  const dropdownItems = searchText
    ? filteredItems
    : items.filter(
        (item) => !selectedItems.find((selected) => selected.id === item.id)
      );

  return (
    <div className={className} style={{ minWidth: 300, position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "4px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {selectedItems.map((item) => (
          <span
            key={item.id}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 8px",
              margin: "4px",
              background: "#e0e0e0",
              borderRadius: "12px",
              fontSize: "14px",
            }}
          >
            {item.name}
            <span
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                color: "#888",
                fontWeight: "bold",
              }}
              onClick={() => handleRemove(item)}
            >
              ×
            </span>
          </span>
        ))}
        <input
          type="text"
          ref={inputRef}
          value={searchText}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          placeholder="Search medicines"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "14px",
            padding: "4px",
          }}
        />
      </div>
      {isDropdownOpen && dropdownItems.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 10,
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {dropdownItems.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: focusIndex === index ? "#f0f0f0" : "white",
                borderBottom: "1px solid #eee",
                textAlign: 'left'
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
