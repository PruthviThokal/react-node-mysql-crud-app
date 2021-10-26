import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { getUser, getUsers } from "../functions/usersManipulation";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [oneUser, setOneUser] = useState([]);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    listAllUsers();
  }, []);

  const listAllUsers = () => {
    getUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const registerUser = () => {
    if (password === confirmpassword) {
      axios
        .post(`http://localhost:8001/api/adduser`, {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          setShow(false);
          toast.success("User added successfully.");
          listAllUsers();
        })
        .catch((err) => {
          setShow(false);
          toast.error("This user is already exists.");
        });
    } else {
      toast.error("confirm password not match.");
    }
  };

  const editUser = () => {
    const id = oneUser[0].id;
    if (updatePassword === updateConfirmPassword) {
      axios
        .put(`http://localhost:8001/api/updateuser/${id}`, {
          updateUser: updateUsername,
          updatePass: updatePassword,
        })
        .then((res) => {
          setShow2(false);
          toast.success("User updated successfully.");
          listAllUsers();
        })
        .catch((err) => {
          setShow2(false);
          toast.error("Something went wrong.");
        });
    } else {
      toast.error("confirm password not match.");
    }
  };

  const getId = (event) => {
    const id = event.target.getAttribute("id");
    getUser(id).then((res) => {
      setShow1(true);
      setOneUser(res.data);
    });
  };

  const getId1 = (event) => {
    const id = event.target.getAttribute("id");
    getUser(id).then((res) => {
      setShow2(true);
      setOneUser(res.data);
    });
  };

  const deleteUser = (event) => {
    const id = event.target.getAttribute("id");
    if (window.confirm("Do you want to delete this user?")) {
      axios
        .delete(`http://localhost:8001/api/deleteuser/${id}`)
        .then((res) => {
          toast.success("User deleted successfully.");
          listAllUsers();
        })
        .catch((err) => {
          toast.error("Something went wrong.");
        });
    }
  };

  return (
    <>
      <SideBar />
      <section className="home-section">
        <div className="container-fluid">
          <div className="container-fluid px-auto py-2" id="graph_page_one">
            <div className="col">
              <button
                className="btn btn-primary ml-0"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={handleShow}
              >
                Add User
              </button>

              {/* add user model */}
              <Modal show={show} onHide={handleClose1} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <label className="ml-1">Username</label>
                  <input
                    className="ml-1 form-control"
                    type="text"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                  <label className="ml-1 p-1">Email</label>
                  <input
                    className="ml-1 form-control"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <label className="ml-1 p-1">Password</label>
                  <input
                    className="ml-1 form-control"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <label className="ml-1 p-1">Confirm Password</label>
                  <input
                    className="ml-1 form-control"
                    type="password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={registerUser}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* show user model */}

              {oneUser.length > 0 &&
                oneUser.map((o) => (
                  <Modal
                    show={show1}
                    onHide={handleClose1}
                    animation={false}
                    key={o.email}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <label className="ml-1">Username</label>
                      <input
                        className="ml-1 form-control"
                        type="text"
                        value={o.username}
                        disabled
                      />
                      <label className="ml-1 p-1">Email</label>
                      <input
                        className="ml-1 form-control"
                        type="email"
                        value={o.email}
                        disabled
                        required
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose1}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                ))}

              {/* show user for update model */}
              {oneUser.length > 0 &&
                oneUser.map((o) => (
                  <Modal
                    show={show2}
                    onHide={handleClose2}
                    animation={false}
                    key={o.id}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Update User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <label className="ml-1">Username</label>
                      <input
                        className="ml-1 form-control"
                        type="text"
                        defaultValue={o.username}
                        onChange={(e) => {
                          setUpdateUsername(e.target.value);
                        }}
                      />
                      <label className="ml-1 p-1">Email</label>
                      <input
                        className="ml-1 form-control"
                        type="email"
                        defaultValue={o.email}
                        disabled
                        required
                      />
                      <label className="ml-1 p-1">Password</label>
                      <input
                        className="ml-1 form-control"
                        type="password"
                        defaultValue={o.password}
                        onChange={(e) => {
                          setUpdatePassword(e.target.value);
                        }}
                        required
                      />
                      <label className="ml-1 p-1">Confirm Password</label>
                      <input
                        className="ml-1 form-control"
                        type="password"
                        defaultValue={o.password}
                        onChange={(e) => {
                          setUpdateConfirmPassword(e.target.value);
                        }}
                        required
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose2}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={editUser}>
                        Update
                      </Button>
                    </Modal.Footer>
                  </Modal>
                ))}
            </div>
            <hr />
            <div className="col">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 &&
                    users.map((u) => (
                      <tr key={u.email}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                          <button
                            id={u.id}
                            className="btn btn-success btn-sm m-1"
                            onClick={getId}
                          >
                            View
                          </button>

                          <button
                            id={u.id}
                            className="btn btn-warning btn-sm m-1"
                            onClick={getId1}
                          >
                            Edit
                          </button>
                          <button
                            id={u.id}
                            className="btn btn-danger btn-sm m-1"
                            onClick={deleteUser}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
      </section>
    </>
  );
};

export default HomePage;
