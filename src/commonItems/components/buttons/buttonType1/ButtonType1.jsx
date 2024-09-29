import styles from "./buttonType1.module.css";
/**
 * @typedef {object} Props
 * @param {string, HTML} value Text on the button. (e.g.: 'Cancel')
//              or HTML DOM Element
//              (e.g.: <span>Filter <img className="vacancy-in-button-icon" src={filterIcon} alt="" height="14px" /> </span>
 * @param {function} onClickHandler 
 * @param {string} buttonStrength Button style. Possible values: ['1', '2', '3', '4']
 * @param {string} customDatasetValue Custom dataset property customdataset.
 * @param {string} buttonClass 
 */
/**
 * Component returns a typical button to be used in a project.
 * @param {Props} props 
 * @returns {JSX.Element} Button
 */

export const ButtonType1 = (props) => {
  //* Props
  const value = props.value ? props.value : "Button";
  const onClickHandler = props.onClickHandler;
  const buttonStrength =
    "buttonStrength" + (props.strength ? +props.strength : "1");
  const buttonDatasetValue = props.buttonDatasetValue;
  const buttonClass = props.buttonClass;

  //* Main Body
  return (
    <button
      className={`${styles.button1} ${styles[buttonStrength]} ${buttonClass}`}
      onClick={onClickHandler}
      data-buttondataset={buttonDatasetValue}
    >
      {value}
    </button>
  );
};
