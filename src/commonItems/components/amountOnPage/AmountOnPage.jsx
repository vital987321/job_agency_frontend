import styles from "./AmountOnPage.module.css";

export const AmountOnPage = (props) => {
  //* props
  const onPageListItemsAmount = props.onPageListItemsAmount;
  const onChangeListItemsAmount = props.onChangeListItemsAmount;

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
