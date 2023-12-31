import { useState, createContext } from "react";

export const DropdownContext = createContext({});

export const DropdownProvider = ({ children }) => {
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState(null);

  const fetchDropdownItems = (items) => {
    console.log("fetching dropdown items" + items);
    setDropdownItems(items);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const getButtonRef = (ref) => {
    console.log("getting button ref" + ref);
    setButtonRef(ref);
  };

  return (
    <DropdownContext.Provider
      value={{
        dropdownItems,
        isDropdownOpen,
        buttonRef,
        fetchDropdownItems,
        toggleDropdown,
        getButtonRef,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
