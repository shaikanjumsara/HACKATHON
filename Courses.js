import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const courseData = [
    {
        id: 1,
        title: 'Java full stack development',
        description: 'Hibernate, CRUD operations, and Micro services.',
        instructor: 'RM Balajee ',
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
    instructor: 'Rajesh Tulasi ',
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
    instructor: 'Yellamma ',
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
    instructor: 'Gopala krishna ',
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
    instructor: 'Venkateswarlu ',
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

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courseData);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === '') {
      setFilteredCourses(courseData);
    } else {
      const filtered = courseData.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <div className="courses">
      <h2>Available Courses</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={() => handleSearchChange({ target: { value: searchQuery } })}>Search</button>
      </div>

      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Link key={course.id} to={ `/course/${course.id}`} className="course-card-link">
              <div className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
}

export default Courses;