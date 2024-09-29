import { ButtonType1 } from "../../../../../../commonItems/components/buttons/buttonType1/buttonType1";
export const SubmitButton = (props) => {
  //* Props
  const isUserDataChanged = props.isUserDataChanged;
  const onSubmit = props.onSubmit;

  //* Main Body
  if (isUserDataChanged) {
    return (
      <>
        <ButtonType1 value="Save changes" onClickHandler={onSubmit} />
      </>
    );
  }
};
