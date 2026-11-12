import { useEffect, useState } from "react";


import './App.css'
import Dashboard from './components/Job_Dashboard/Dashboard';
import InputJob from './components/Input_Job/InputJob';
function App() {

  const key = "JobApplications"
  function loadJobs() {
    try {
        const stored = localStorage.getItem(key);

        if (stored === null) {
            return [];
        }

        const parsed = JSON.parse(stored);

        return Array.isArray(parsed) ? parsed : [];

      } catch (error) {
        console.error("Unable to load saved applications:", error);
        return [];
      }
  }
  const [jobs, setJobs] = useState(loadJobs);

  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(jobs))
  }, [jobs])
  function handleAddJob(newJob) {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  }

  function handleDelJob(jobId) {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId))
  }

  function handleStatusChange(id, status){
    setJobs((prevJobs)=> prevJobs.map((job)=> {
      if(job.id === id){
        return {
          ...job,
          status: status
        };
      }
      return job
    }))
  }

  return(
    <div>
      <Dashboard jobs={jobs} onStatusChange={handleStatusChange} onDelJob={handleDelJob}/>
      <InputJob onAdd={handleAddJob}/>
    </div>
  );
}

export default App
