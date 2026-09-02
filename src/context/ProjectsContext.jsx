import { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('https://faidz.fun/pb/api/collections/projects/records?sort=-year');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        
        // Map PocketBase data to match previous structure
        const mappedProjects = data.items.map(item => {
          const pbBase = 'https://faidz.fun/pb/api/files';

          // A media field is either a full URL (kept on R2) or a PocketBase filename
          const toMediaUrl = value => {
            if (!value) return null;
            return /^https?:\/\//.test(value)
              ? value
              : `${pbBase}/${item.collectionId}/${item.id}/${value}`;
          };
          const toList = value => {
            if (!value) return [];
            const list = typeof value === 'string'
              ? (value.trim().startsWith('[') ? JSON.parse(value) : [value])
              : value;
            return list.map(toMediaUrl).filter(Boolean);
          };

          return {
            id: item.id,
            slug: item.slug,
            name: item.name,
            tagline: item.tagline,
            featured: item.featured,
            year: item.year ? item.year.toString() : '',
            category: item.category,
            image: toMediaUrl(item.image),
            video: toMediaUrl(item.video),
            visualDetails: toList(item.visualDetails ?? item.visualdetails),
            technologies: item.technologies ? (typeof item.technologies === 'string' ? JSON.parse(item.technologies) : item.technologies) : [],
            overview: item.overview,
            githubUrl: item.githuburl ?? item.githubUrl ?? '',
            // Keep empty fields so components don't break
            role: item.role || '',
            client: item.client || '',
            duration: item.duration || '',
            color: item.color || 'from-neutral-700 to-neutral-900',
            team: item.team ? (typeof item.team === 'string' ? JSON.parse(item.team) : item.team) : [],
            challenge: item.challenge || '',
            approach: item.approach || '',
            solution: item.solution || '',
            contribution: item.contribution || '',
            outcome: item.outcome || '',
            liveUrl: item.liveUrl ?? item.liveurl ?? null,
            nextProjectSlug: item.nextProjectSlug ?? item.nextprojectslug ?? null
          };
        });

        setProjects(mappedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, isLoading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
}
