
import { Introduction } from "./substructures/introduction/introduction.jsx";
import { Statistics } from "./substructures/statistics/statistics.jsx";
import { OurService } from "./substructures/ourService/ourService.jsx";
import { VacanciesPreview } from "./substructures/vacanciesPreview/vacanciesPreview.jsx";
import { Partners } from "./substructures/partners/partners.jsx";

export const HomeComponent = () => {

  return (
    <>
      {true}
      {<h1>Header</h1> && true}
      <Introduction/>
      <Statistics/>
      <OurService/>
      <VacanciesPreview/>
      <Partners/>
    </>
  );
};
