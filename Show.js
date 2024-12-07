import axios from "axios";
import { useState } from "react";
import './Show.css';

function Show() {
    const [result, setResult] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false); // State to toggle form visibility

    // Fetch data when component mounts or state changes
    if (result == null) {
        axios.get("http://localhost:8080/all", {}).then((response) => {
            setResult(response.data);
        });
    }

    function handleDelete(event) {
        const email = event.currentTarget.getAttribute("email");
        axios.delete("http://localhost:8080/delete", {
            params: { email: email }
        }).then((res) => {
            setResult(null); // Refetch data after delete
        });
    }

    function handleEdit(name, email, role, password) {
        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        document.getElementById("role").value = role;
        document.getElementById("password").value = password;
        document.getElementsByName("update")[0].style.display = "block";
    }

    function handleUpdate() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const role = document.getElementById("role").value;
        const password = document.getElementById("password").value;

        axios.put("http://localhost:8080/update", {
            name: name,
            email: email,
            role: role,
            password: password,
        }).then((res) => {
            setResult(null); // Refetch data after update
        });
    }

    function handleAddUser(event) {
        event.preventDefault(); // Prevent form reload
        const name = event.target.elements["add-name"].value;
        const email = event.target.elements["add-email"].value;
        const role = event.target.elements["add-role"].value;
        const password = event.target.elements["add-password"].value;

        axios.post("http://localhost:8080/addUser", {
            name: name,
            email: email,
            role: role,
            password: password,
        }).then((res) => {
            setResult(null); // Refetch data after adding user
            setShowAddForm(false); // Close the form after success
        }).catch((err) => {
            alert("Error adding instructor: " + err.response.data);
        });
    }

    if (result == null) {
        return (
            <div>
                Data is fetching...
            </div>
        );
    } else {
        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Password</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((obj) => {
                            return (
                                <tr key={obj.email}>
                                    <td>{obj.name}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.role}</td>
                                    <td>{obj.password}</td>
                                    <td>
                                        <i
                                            className="fa fa-edit"
                                            onClick={() => handleEdit(obj.name, obj.email, obj.role, obj.password)}
                                        ></i>
                                    </td>
                                    <td>
                                        <i
                                            className="fa fa-trash"
                                            email={obj.email}
                                            onClick={handleDelete}
                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Add Instructor Button */}
                <button className="add-instructor-btn" onClick={() => setShowAddForm(true)}>
                    Add Instructor
                </button>

                {/* Modal Form for Adding Instructor */}
                {showAddForm && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowAddForm(false)}>
                                &times;
                            </span>
                            <h2>Add Instructor</h2>
                            <form onSubmit={handleAddUser}>
                                <div>
                                    <label>Name:</label>
                                    <input type="text" name="add-name" required />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input type="email" name="add-email" required />
                                </div>
                                <div>
                                    <label>Role:</label>
                                    <input type="text" name="add-role" required />
                                </div>
                                <div>
                                    <label>Password:</label>
                                    <input type="password" name="add-password" required />
                                </div>
                                <button type="submit">Add Instructor</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Show;
