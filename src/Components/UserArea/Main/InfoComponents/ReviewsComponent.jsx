import "../../../../css/infoComponents/reviews.css";
import clientPhoto1 from "../../../../img/clients/c1.jpg";
import clientPhoto2 from "../../../../img/clients/c2.jpg";
import clientPhoto3 from "../../../../img/clients/c3.jpg";
import clientPhoto4 from "../../../../img/clients/c4.jpg";
import clientPhoto5 from "../../../../img/clients/c5.jpg";
import clientPhoto6 from "../../../../img/clients/c6.jpg";
import clientPhoto7 from "../../../../img/clients/c7.jpg";
import clientPhoto8 from "../../../../img/clients/c8.jpg";


export const ReviewsComponent = () => {
  return (
    <section className="reviews-section">
      <h1 className="review-section-header">Clients Reviews</h1>
      <ul className="reviews-cards-container">
        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto1} alt="photo" />
          <p className="review-card-name">Martin</p>

          <div className="review-card-text">
            I am very grateful to the agency for helping me find a job abroad.
            They provided professional support at every step of the process and
            helped me find the perfect position. I recommend them to everyone!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto2} alt="photo" />
          <p className="review-card-name">Ivana</p>

          <div className="review-card-text">
            The process of obtaining a work visa seemed complicated to me, but
            thanks to the agency everything went smoothly and without any
            hassle. They consulted me in detail on all questions and were in
            touch with me throughout. Thank you very much!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto3} alt="photo" />
          <p className="review-card-name">Max</p>

          <div className="review-card-text">
            Cooperation with the agency was a real eye-opener for me. They not
            only helped me find a job, but also provided me with valuable
            employment advice. I am very satisfied with the result!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto4} alt="photo" />
          <p className="review-card-name">Veronika</p>

          <div className="review-card-text">
            Many thanks to the agency for helping me with my work visa
            application. They were very attentive to my needs and efficiently
            handled all issues that arose. Professionalism at the highest level!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto5} alt="photo" />
          <p className="review-card-name">Peter</p>

          <div className="review-card-text">
            Very satisfied with the service of this agency. Thanks to their
            efforts, I found a dream job that matches my professional skills and
            expectations. Highly recommended!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto6} alt="photo" />
          <p className="review-card-name">Marco</p>

          <div className="review-card-text">
            My employment history was complicated, but thanks to the agency I
            found a solution for my situation. They not only found me a suitable
            vacancy, but also provided moral support on my way to a new job.
            Thank you for your patience and help!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto7} alt="photo" />
          <p className="review-card-name">Polina</p>

          <div className="review-card-text">
            I was impressed by the professionalism and attentive attitude of the
            agency staff. Thanks to their help I was able to quickly find a job
            and start a new chapter in my career. I recommend to everyone who is
            looking for a reliable employment partner!
          </div>
        </li>

        <li className="review-card">
          <img className="review-card-photo" src={clientPhoto8} alt="photo" />
          <p className="review-card-name">Tomas</p>

          <div className="review-card-text">
            Working with this agency was a lifesaver for me. They not only
            helped me find a job, but also supported me throughout the whole
            process. Thank you very much for your professional attitude and
            efficient work!
          </div>
        </li>
      </ul>

      <p className="review-subfooter">
        If you would like to leave your review, please send it to us via
        jobagency@hotline.com
      </p>
    </section>
  );
};
