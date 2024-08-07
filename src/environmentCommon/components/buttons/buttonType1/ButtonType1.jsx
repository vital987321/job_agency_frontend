import styles from "./buttonType1.module.css";

// This component returns a typical button to be used in a project.
// Props:
//     value - represents a text to be on the Button.
//          type: string (expl: 'Cancel')
//              or HTML DOM Element 
//              (expl: <span>Filter <img className="vacancy-in-button-icon" src={filterIcon} alt="" height="14px" /> </span>
//     onClickHandler - function to be called on button click. 
//          type: function
//     strength - represents a button style. Posible values are '1', '2', '3', '4'
//          type: string

export const ButtonType1 = (props) => {
    const value=props.value ? props.value : 'Button'
    const onClickHandler=props.onClickHandler
    const buttonStrength='buttonStrength'+(props.strength? +props.strength : '1')
  return (
    <button
      className={`${styles.button1} ${styles[buttonStrength]}`}
      onClick={onClickHandler}
    >
      {value}
    </button>
  );
};
