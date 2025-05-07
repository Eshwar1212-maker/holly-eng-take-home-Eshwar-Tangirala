import jobDescriptions from '../../../data/job-descriptions.json';
import salaryData from '.././.././../data/salaries.json';

export function filterJobData(query: string) {
  const jobTitle = extractJobTitle(query).toLowerCase().trim();
  const location = extractLocation(query).toLowerCase().trim();

  console.log("Extracted Job Title:", jobTitle);
  console.log("Extracted Location:", location);

  const jobDescription = jobDescriptions.find(job => 
    job.title.toLowerCase().includes(jobTitle)  );

  const jobCode = jobDescriptions.find(job =>  job.title.toLowerCase().includes(jobTitle))?.code

  console.log("Job Code: ", jobCode);

  const salaryDataForJob = salaryData.find(salary => 
    salary['Job Code'] === jobCode 
  );

  console.log("Filtered Job Description:", jobDescription);
  console.log("Filtered Salary Data:", salaryDataForJob);

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
