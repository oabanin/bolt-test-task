function Header() {
  return (
    <nav className="mx-auto navbar navbar-expand-md navbar-light navbar-top bg-light">
      <div className="container">
        <a className="navbar-brand" href="https://bolt.eu">
          <img
            width={69}
            height={40}
            src="https://careers.bolt.eu/en/careers/assets/img/logo-brand-e6913a540184b19c7448f8427856e565.svg"
            className="d-inline-block align-top"
            alt="Bolt brand"
          />
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="navbar-collapse collapse" id="navbarsExample04">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Ride
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Become a driver
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Fleet
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Business
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Business
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Scooters
              </a>
            </li>
          </ul>
          <button type="button" className="btn btn-bolt px-4">
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
