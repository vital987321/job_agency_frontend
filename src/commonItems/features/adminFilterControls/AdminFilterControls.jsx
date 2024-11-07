import { ButtonType1 } from "../../components/buttons/buttonType1/ButtonType1";
import { AmountOnPage } from "../../components/amountOnPage/AmountOnPage";
import filterIcon from "../../../assets/svg/settings.svg";
import closeIcon from "../../../assets/svg/X.svg";
import styles from "./AdminFilterControls.module.css";

/**
 * @typedef {object} props
 * @property {function} filterButtonHandler
 * @property {function} resetFiltersHandler
 * @property {string} onPageListItemsAmount
 * @property {function} onChangeListItemsAmount
 * @property {boolean} displayResetFilterButton
 * 
 * @param {*} props
 * @returns {JSX.Element}
 */

export const AdminFilterControls = (props) => {
  //* Props
  const {
    filterButtonHandler,
    resetFiltersHandler,
    onPageListItemsAmount,
    onChangeListItemsAmount,
    displayResetFilterButton,
   } = props;


  return (
    <div className={styles["admin-list-items-form-controls"]}>
      <div className={styles["admin-list-items-form-buttons-container"]}>
        <ButtonType1
          value={
            <span>
              Filter{" "}
              <img
                className={styles["admin-filter-button-icon"]}
                src={filterIcon}
                alt=""
                height="14px"
              />
            </span>
          }
          onClickHandler={filterButtonHandler}
          strength="1"
        />

        {displayResetFilterButton &&  <div
          className={styles["admin-reset-filters-button-container"]}
        >
          <ButtonType1
            value={
              <span>
                Reset Filters{" "}
                <img
                  className={styles["admin-filter-button-icon"]}
                  src={closeIcon}
                  alt=""
                  height="14px"
                />
              </span>
            }
            onClickHandler={resetFiltersHandler}
            strength="2"
          />
        </div>}
        
      </div>
      <AmountOnPage
        onPageListItemsAmount={onPageListItemsAmount}
        onChangeListItemsAmount={onChangeListItemsAmount}
      />
    </div>
  );
};
