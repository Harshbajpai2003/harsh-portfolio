import { useState, useEffect } from 'react';
import { getAllProjects } from './services/projectService';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to fetch projects:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Harsh Bajpai — Portfolio</h1>

      {loading && <p>Loading projects...</p>}

      {!loading && projects.length === 0 && <p>No projects found.</p>}

      {!loading && projects.map((project) => (
        <div key={project.id} className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-primary">{project.title}</h2>
          <p className="text-gray-300">{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;