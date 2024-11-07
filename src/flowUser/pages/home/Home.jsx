
import { Introduction } from "./substructures/introduction/Introduction.jsx";
import { Statistics } from "./substructures/statistics/Statistics.jsx";
import { OurService } from "./substructures/ourService/OurService.jsx";
import { VacanciesPreview } from "./substructures/vacanciesPreview/VacanciesPreview.jsx";
import { Partners } from "./substructures/partners/Partners.jsx";

export const Home = () => {

  return (
    <>
      <Introduction/>
      <Statistics/>
      <OurService/>
      <VacanciesPreview/>
      <Partners/>
    </>
  );
};
