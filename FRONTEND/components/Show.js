import axios from "axios";
import { useState, useEffect } from "react";
import './Show.css';

function Show() {
    const [result, setResult] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editData, setEditData] = useState(null); // State for edit data
    const [loading, setLoading] = useState(true); // To handle loading state

    // Fetch data when the component mounts or after changes
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/all");
            setResult(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete("http://localhost:8080/delete", {
                params: { email }
            });
            fetchData(); // Refetch data after delete
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (name, email, role, password) => {
        setEditData({ name, email, role, password });
    };

    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:8080/update", editData);
            fetchData(); // Refetch data after update
            setEditData(null); // Close edit form
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleAddUser = async (event) => {
        event.preventDefault();
        const name = event.target.elements["add-name"].value;
        const email = event.target.elements["add-email"].value;
        const role = event.target.elements["add-role"].value;
        const password = event.target.elements["add-password"].value;

        try {
            await axios.post("http://localhost:8080/addUser", {
                name,
                email,
                role,
                password,
            });
            fetchData(); // Refetch data after adding user
            setShowAddForm(false); // Close the form
        } catch (error) {
            alert("Error adding instructor: " + (error.response?.data || error.message));
        }
    };

    if (loading) {
        return <div>Data is fetching...</div>;
    }

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
                    {result.map((obj) => (
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
                                    onClick={() => handleDelete(obj.email)}
                                ></i>
                            </td>
                        </tr>
                    ))}
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
                            <div>
                                <label>Skill:</label>
                                <input type="text" name="add-skill" required />
                            </div>
                            <button type="submit">Add Instructor</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Form for Editing Instructor */}
            {editData && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setEditData(null)}>
                            &times;
                        </span>
                        <h2>Edit Instructor</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    required
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Role:</label>
                                <input
                                    type="text"
                                    value={editData.role}
                                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={editData.password}
                                    onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Skill:</label>
                                <input
                                    type="text"
                                    value={editData.skill}
                                    onChange={(e) => setEditData({ ...editData, skill: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="button" onClick={handleUpdate}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Show;
