import { Link } from "react-router-dom";

import classes from '../../../styles/DropdownCard.module.css';

const DropdownCard = (props) => {
  const { items, button } = props;

  if (!button) {
    return null;
  }

  const buttonRect = button.getBoundingClientRect();
  const verticalOffset = 5;
  const dropdownStyle = {
    top: buttonRect.top + buttonRect.height + verticalOffset,
    right: window.innerWidth - buttonRect.right,
  };

  const closeDropdownHandler = () => {
    props.close();
  };

  return (
    <div className={classes.cardContainer} style={dropdownStyle}>
      {items.map((item) => (
        <div className={classes.itemContainer} key={Math.random()}>
          <img src={item.image} alt="item icon" />
          <Link to={item.path} onClick={closeDropdownHandler}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DropdownCard;
