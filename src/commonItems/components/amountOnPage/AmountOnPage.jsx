import styles from "./AmountOnPage.module.css";

/**
 * @typedef {object} Props
 * @property {string} onPageListItemsAmount
 * @property {function} onChangeListItemsAmount
 * @param {Props} props 
 * @returns 
 */

export const AmountOnPage = ({onPageListItemsAmount, onChangeListItemsAmount}) => {

  //* Main Body
  return (
    <div>
      <label htmlFor="applicaption-filter-on-page-input">on Page</label>
      <select
        className={styles["on-page-select"]}
        id="applicaption-filter-on-page-input"
        value={onPageListItemsAmount}
        onChange={onChangeListItemsAmount}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};
