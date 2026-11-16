
import "./style.css"

const Dashboard = function({jobs, onStatusChange, onDelJob}){
    const columns = [
    
    "company",
    "Position",
    "Application_Date",
    "Salary",
    "Next_Action",
    "Website",
    "Contact",
    "Ref_Link",
    "status"
    ];
    return(
        <div className="dashboard w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            {
                jobs.length === 0 ? 
                (<div className="px-6 py-12 text-center">
                    <h3 className="text-lg font-semibold text-slate-800">
                        No applications yet
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Start tracking your job search by adding your first application below.
                    </p>
                </div>)
                :
                (<table className="w-full min-w-[950px] border-collapse text-left text-sm">
                <thead>
                    <tr>
                        {columns.map((val)=> <th key={val} className="bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600"><span>{val.replaceAll("_", " ")}</span></th>)}
                        <th key={"del"} className="bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600"><span>Remove</span></th>
                    </tr>
                </thead>
                <tbody> 
                    {jobs.map((jobObj)=> <tr key={jobObj.id}>{columns.map((column)=>
                        <td key={column} className="border-t border-slate-100 px-4 py-3 text-slate-700">
                            {
                                column !== "status"? <span>{jobObj[column]}</span> :
                                <select className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none" value={jobObj["status"]} onChange={(e)=> onStatusChange(jobObj.id, e.target.value )}>
                                    <option value="">--Application Status--</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewed">Interviewed</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Offered">Offered</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            }
                            
                        </td>
                    )}
                        <td key={"del"} className="border-t border-slate-100 px-4 py-3 text-slate-700"><span ><button className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50" onClick={()=> onDelJob(jobObj.id)}>Delete</button></span></td>
                    </tr> )}
                </tbody>
                <tfoot></tfoot>
                </table>
                )
            }
            
        </div> 
    );

}

export default Dashboard;