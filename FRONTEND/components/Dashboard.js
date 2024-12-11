import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Import the course data
const courseData = [
  {
      id: 1,
      title: 'Java full stack development',
      description: 'Hibernate, CRUD operations, and Micro services.',
      instructor: 'RM Balajee sir',
      duration: '16 weeks',
      pptLink: 'https://www.slideshare.net/slideshow/java-full-stack-developerpptx/258516174',
      videoLink: 'https://www.youtube.com/watch?v=Ba8t0iBQvRQ',
      assignments: [
          { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
          { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
        ],
 },

{
  id: 2,
  title: 'Web Development Bootcamp',
  description: 'Become a full-stack web developer with hands-on projects.',
  instructor: 'Jane Smith',
  duration: '8 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/web-development-ppt-250270935/250270935',
  videoLink: 'https://www.youtube.com/watch?v=zJSY8tbf_ys',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},
{
  id: 3,
  title: 'Data Science Essentials',
  description: 'Learn data analysis, visualization, and machine learning basics.',
  instructor: 'Sarah Lee',
  duration: '6 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/introduction-to-data-science-164979975/164979975',
  videoLink: 'https://www.youtube.com/watch?v=jmZ_feuYnkQ',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},
{
  id: 4,
  title: 'Solution Architect on cloud',
  description: 'Services, VPC, and Networks.',
  instructor: 'Rajesh Bingu',
  duration: '12 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/aws-solution-architect-associate-106471582/106471582',
  videoLink: 'https://www.youtube.com/watch?v=gBCS931gKSU',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},
{
  id: 5,
  title: 'Enterprise Programming',
  description: 'Hibernate, CRUD operations, and Micro services.',
  instructor: 'Rajesh Tulasi sir',
  duration: '16 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/enterprise-java-unit1chapter1/250190150',
  videoLink: 'https://www.youtube.com/watch?v=1Cox7GDHFLY&list=PLf2Wj8X3RbBS8IbrmdbSTRNDKauvsVZsh',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},
{
  id: 6,
  title: 'Cloud Infrastructure services',
  description: 'Cloud services, visualization, and Load Balancer.',
  instructor: 'Yellamma mam',
  duration: '10 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/cloud-computing-31961574/31961574',
  videoLink: 'https://www.youtube.com/watch?v=M988_fsOSWo',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},
{
  id: 7,
  title: 'Advance Operating System',
  description: 'Algorithms, visualization, and machine learning basics.',
  instructor: 'Gopala krishna sir',
  duration: '15 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/cs9222-advanced-operating-system/54590046',
  videoLink: 'https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},
{
  id: 8,
  title: 'Quantum Physics',
  description: 'Cubic structure, Einsteins theory, and Bohrs atomic theory.',
  instructor: 'Venkateswarlu Sir',
  duration: '19 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/web-development-ppt-250270935/250270935',
  videoLink: 'https://www.youtube.com/watch?v=Usu9xZfabPM',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},

{
  id: 9,
  title: 'Introduction to Programming',
  description: 'Learn the basics of programming with JavaScript.',
  instructor: 'John Doe',
  duration: '4 weeks',
  pptLink: 'https://www.slideshare.net/slideshow/web-development-ppt-250270935/250270935',
  videoLink: 'https://www.youtube.com/watch?v=zOjov-2OZ0E',
  assignments: [
      { id: 1, title: 'Assignment 1', pdfLink: 'https://example.com/assignment1.pdf' },
      { id: 2, title: 'Assignment 2', pdfLink: 'https://example.com/assignment2.pdf' },
    ],
},

];

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courseData);

  // Handler for searching courses
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = courseData.filter(course => 
      course.title.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term)
    );
    setFilteredCourses(filtered);
  };

  // Filter due assignments
  const today = new Date();
  const upcomingAssignments = courseData
    .flatMap(course => course.assignments.map(assignment => ({
      ...assignment,
      courseId: course.id,
      courseTitle: course.title,
      dueDate: new Date(assignment.dueDate || today)
    })))
    .filter(assignment => assignment.dueDate >= today)
    .sort((a, b) => a.dueDate - b.dueDate);

  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>

      {/* Search Bar */}
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearch} 
        placeholder="Search for a course or instructor..." 
        className="search-bar"
      />

      {/* Enrolled Courses Section */}
      <section className="enrolled-courses">
        <h2>Enrolled Courses</h2>
        <div className="course-list">
          {filteredCourses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`} className="course-card-link">
              <div className="course-card">
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor}</p>
                <p>Duration: {course.duration}</p>
                <p>Progress: {Math.floor(Math.random() * 100)}%</p> {/* Randomized for display */}
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Assignments Section */}
      <section className="upcoming-assignments">
        <h2>Upcoming Assignments</h2>
        <div className="assignment-list">
          {upcomingAssignments.map((assignment, index) => (
            <div key={index} className="assignment-card">
              <h4>{assignment.title}</h4>
              <p>Due: {assignment.dueDate.toDateString()}</p>
              <Link to={`/course/${assignment.courseId}`} className="assignment-link">
                {assignment.courseTitle}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
