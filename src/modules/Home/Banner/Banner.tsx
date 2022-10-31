import './Banner.scss';
import Form from './Form/Form';

function Banner() {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-lg-row p-banner">
        <div className="col-lg-7 px-0 pl-md-0 pr-md-5">
          <h1 className="text-white pt-lg-5 pb-lg-2 text-title ">
            Make money
            <br className="d-none d-lg-block" /> driving with Bolt
          </h1>
          <p className="text-white py-2">
            Become a Bolt driver, set your schedule and earn extra money by driving!
          </p>
          <button className="text-uppercase text-white bg-transparent border-0 p-0 font-weight-bold d-none d-lg-inline-block">
            Learn more <i className="ml-2 bi bi-arrow-down-circle" />
          </button>
        </div>
        <div className="col-lg-5 px-0">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default Banner;
