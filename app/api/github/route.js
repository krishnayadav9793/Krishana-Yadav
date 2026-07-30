import { NextResponse } from "next/server";

const USERNAME = "krishnayadav9793";
const GITHUB_API_URL = `https://api.github.com/users/${USERNAME}`;

export const GET = async (req, res) => {
  try {
    const fetchOptions = {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "krishna-yadav-portfolio"
      }
    };

    // 1. Fetch Profile Info
    const profileRes = await fetch(GITHUB_API_URL, fetchOptions);
    if (!profileRes.ok) {
      throw new Error(`GitHub Profile fetch failed with status ${profileRes.status}`);
    }
    const profileData = await profileRes.json();

    // 2. Fetch Repositories
    const reposRes = await fetch(`${GITHUB_API_URL}/repos?per_page=100&sort=updated`, fetchOptions);
    let reposData = [];
    if (reposRes.ok) {
      reposData = await reposRes.json();
    }

    // 3. Fetch Public Events
    const eventsRes = await fetch(`${GITHUB_API_URL}/events/public?per_page=20`, fetchOptions);
    let eventsData = [];
    if (eventsRes.ok) {
      eventsData = await eventsRes.json();
    }

    // Process Repositories statistics
    let totalStars = 0;
    let totalForks = 0;
    const languageCounts = {};
    
    reposData.forEach(repo => {
      if (!repo.fork) {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      }
    });

    // Calculate language percentages
    const totalReposWithLanguage = Object.values(languageCounts).reduce((a, b) => a + b, 0);
    const languages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percentage: totalReposWithLanguage > 0 ? Math.round((count / totalReposWithLanguage) * 100) : 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // top 5 languages

    // Get top 6 repos (sorted by stars, fallback to updated date)
    const topRepos = [...reposData]
      .filter(repo => !repo.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 6)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        homepage: repo.homepage,
        updatedAt: repo.updated_at
      }));

    // Process and format recent activity events
    const activity = eventsData
      .slice(0, 10)
      .map(event => {
        let title = "";
        let details = "";
        const repoName = event.repo.name.replace(`${USERNAME}/`, "");
        const date = event.created_at;

        switch (event.type) {
          case "PushEvent":
            const commitCount = event.payload.commits?.length || 0;
            const commitMsg = event.payload.commits?.[0]?.message || "";
            title = `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""} to repository`;
            details = commitMsg ? `"${commitMsg}"` : "";
            break;
          case "CreateEvent":
            title = `Created a new ${event.payload.ref_type || "repository"}`;
            details = event.payload.ref ? `Branch/Tag: ${event.payload.ref}` : `Repository: ${repoName}`;
            break;
          case "WatchEvent":
            if (event.payload.action === "started") {
              title = "Starred repository";
            } else {
              title = "Updated watch status of repository";
            }
            break;
          case "ForkEvent":
            title = "Forked repository";
            break;
          case "IssuesEvent":
            title = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in`;
            details = event.payload.issue?.title || "";
            break;
          case "PullRequestEvent":
            title = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} pull request in`;
            details = event.payload.pull_request?.title || "";
            break;
          case "PublicEvent":
            title = "Made repository public";
            break;
          default:
            title = `Performed action in`;
            details = event.type.replace("Event", "");
        }

        return {
          id: event.id,
          type: event.type,
          title,
          repoName,
          repoUrl: `https://github.com/${event.repo.name}`,
          details,
          date
        };
      });

    const responseData = {
      profile: {
        name: profileData.name || USERNAME,
        username: profileData.login,
        avatarUrl: profileData.avatar_url,
        bio: profileData.bio || "Full Stack Developer & Competitive Programmer",
        location: profileData.location || "India",
        followers: profileData.followers,
        following: profileData.following,
        publicRepos: profileData.public_repos,
        url: profileData.html_url
      },
      stats: {
        totalStars,
        totalForks,
        languages
      },
      topRepos,
      activity
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (e) {
    console.error("GitHub API Route Error:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}; 