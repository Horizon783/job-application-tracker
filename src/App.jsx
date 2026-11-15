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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight">Job Application Tracker</h1>
          <p className="mt-2 text-slate-600">Organize and track your job applications.</p>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
        <Dashboard jobs={jobs} onStatusChange={handleStatusChange} onDelJob={handleDelJob}/>
        <InputJob onAdd={handleAddJob}/>
      </main>

    </div>
  );
}

export default App
