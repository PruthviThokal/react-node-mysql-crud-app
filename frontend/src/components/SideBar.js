import React from "react";

const SideBar = ({ history }) => {
  const logout = () => {
    alert("DO you want to logout ?");
    localStorage.removeItem("email");
    history.push("/");
  };
  return (
    <>
      <div className="sidebar open">
        <div className="logo-details">
          <i className="bx bx-rocket icon"></i>
          <div className="logo_name">Sidebar</div>
        </div>
        <ul className="nav-list">
          <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>

          <li>
            <a href="/#">
              <i className="bx bx-cog"></i>
              <span onClick={logout} className="links_name">
                Logout
              </span>
            </a>
            <span className="tooltip">Logout</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4E03AQE7zoDnmPKoMQ/profile-displayphoto-shrink_400_400/0/1630865477624?e=1639008000&v=beta&t=tA0hLCwrqc7ElaFL1LOs2y8dw3lAHmCdT89ChOrHTD4"
                alt="profileImg"
              />
              <div className="name_job">
                <div className="name">Pruthviraj Thokal</div>
                <div className="job">Full Stack Engineer</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
