import React from 'react';

const assignments = [
    { id: 1, name: "sara", assignment: "Assignment1.pdf", url: "/path/to/Assignment1.pdf" },
    { id: 2, name: "anjum", assignment: "Assignment2.pdf", url: "/path/to/Assignment2.pdf" },
    { id: 3, name: "lahari", assignment: "Assignment3.pdf", url: "/path/to/Assignment3.pdf" },
    { id: 4, name: "anjumsara", assignment: "Assignment4.pdf", url: "/path/to/Assignment4.pdf" },
    { id: 5, name: "riya", assignment: "Assignment5.pdf", url: "/path/to/Assignment5.pdf" },
    { id: 6, name: "Sarah ", assignment: "Assignment6.pdf", url: "/path/to/Assignment6.pdf" },
    { id: 7, name: "abcd", assignment: "Assignment7.pdf", url: "/path/to/Assignment7.pdf" },
    { id: 8, name: "abc", assignment: "Assignment8.pdf", url: "/path/to/Assignment8.pdf" },
    { id: 9, name: "vijay", assignment: "Assignment9.pdf", url: "/path/to/Assignment9.pdf" },
    { id: 10, name: "Ashley Taylor", assignment: "Assignment10.pdf", url: "/path/to/Assignment10.pdf" },
    { id: 11, name: "Joshua Anderson", assignment: "Assignment11.pdf", url: "/path/to/Assignment11.pdf" },
    { id: 12, name: "Sophia Thomas", assignment: "Assignment12.pdf", url: "/path/to/Assignment12.pdf" },
    { id: 13, name: "Daniel Jackson", assignment: "Assignment13.pdf", url: "/path/to/Assignment13.pdf" },
    { id: 14, name: "Olivia White", assignment: "Assignment14.pdf", url: "/path/to/Assignment14.pdf" },
    { id: 15, name: "Andrew Harris", assignment: "Assignment15.pdf", url: "/path/to/Assignment15.pdf" },
    { id: 16, name: "Emma Martinez", assignment: "Assignment16.pdf", url: "/path/to/Assignment16.pdf" },
    { id: 17, name: "Ryan Clark", assignment: "Assignment17.pdf", url: "/path/to/Assignment17.pdf" },
    { id: 18, name: "Mia Lewis", assignment: "Assignment18.pdf", url: "/path/to/Assignment18.pdf" },
    { id: 19, name: "William Walker", assignment: "Assignment19.pdf", url: "/path/to/Assignment19.pdf" },
    { id: 20, name: "Isabella Young", assignment: "Assignment20.pdf", url: "/path/to/Assignment20.pdf" },
  ];
  

function AssignmentSubmission() {
  const handleDownload = (url, assignment) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = assignment;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`${assignment} downloaded successfully.`);
  };

  const handleView = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Assignment Submissions</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assignment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.name}</td>
              <td>{submission.assignment}</td>
              <td>
                <button
                  onClick={() => handleDownload(submission.url, submission.assignment)}
                  style={{ marginRight: '10px' }}
                >
                  Download
                </button>
                <button onClick={() => handleView(submission.url)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentSubmission;
