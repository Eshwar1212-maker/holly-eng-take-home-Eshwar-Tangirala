import jobDescriptions from '../../../data/job-descriptions.json';
import salaryData from '.././.././../data/salaries.json';

export function filterJobData(query: string) {
  const jobTitle = extractJobTitle(query).toLowerCase().trim();
  
  const jobDescription = jobDescriptions.find(job => 
    job.title.toLowerCase().includes(jobTitle)  );

  const jobCode = jobDescriptions.find(job =>  job.title.toLowerCase().includes(jobTitle))?.code

  const salaryDataForJob = salaryData.find(salary => 
    salary['Job Code'] === jobCode 
  );

  if (query.toLowerCase().includes("salary")) {
    return { jobDescription: null, salaryData: salaryDataForJob };
  } else {
    return { jobDescription, salaryData: null };
  }
}

export function extractJobTitle(query: string): string {
  const titleKeywords = [
    "assistant sheriff",
    "assistant chief probation officer",
    "public information specialist",
    "appraiser trainee",
    "meteorologist"
  ];
  
  for (let title of titleKeywords) {
    if (query.toLowerCase().includes(title)) {
      return title;
    }
  }
  
  return "";
}

export function extractLocation(query: string): string {
  const locationKeywords = [
    "san diego",
    "san bernardino",
    "ventura",
    "kern county",
    "sd county"
  ];
  
  for (let location of locationKeywords) {
    if (query.toLowerCase().includes(location)) {
      return location;
    }
  }

  return "";
}
