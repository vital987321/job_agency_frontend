import { useSearchParams, useNavigate } from "react-router-dom";
import { ButtonType1 } from "../../../../../commonItems/components/buttons/buttonType1/ButtonType1";
import closeIcon from "../../../../../assets/svg/X.svg";
import styles from "./ResetFilterButton.module.css"

export const ResetFiltersButton = () => {
    //* Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate=useNavigate()

    //* Functions
    const resetFiltersHandler = () => {
        navigate("");
      };
    
    //*  Main Body
    if (
      searchParams.has("key_search") ||
      searchParams.has("salary_gte") ||
      searchParams.has("salary_lte") ||
      searchParams.has("location") ||
      searchParams.has("residence_type")
    ) {
      return (
        <div className={styles["reset-filter-button-container"]}>
          <ButtonType1
            value={
              <span>
                Reset Filters{" "}
                <img
                  className={styles["vacancy-in-button-icon"]}
                  src={closeIcon}
                  alt=""
                  height="14px"
                />
              </span>
            }
            onClickHandler={resetFiltersHandler}
            strength="3"
          />
        </div>
      );
    }
  };