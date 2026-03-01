export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();
    
    // Filter out forks and repos without description (optional)
    return data
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided.",
        html_url: repo.html_url,
        topics: repo.topics || [],
        stargazers_count: repo.stargazers_count,
        language: repo.language
      }));
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
