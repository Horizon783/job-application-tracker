import { useEffect, useState } from "react";
import data from './data/sample_data';

import './App.css'
import Dashboard from './components/Job_Dashboard/Dashboard';
import InputJob from './components/Input_Job/InputJob';
function App() {
  const key = "JobApplications"
  const [jobs, setJobs] = useState(()=>{
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored): data
  });

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
