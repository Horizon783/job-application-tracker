
import "./style.css"

const Dashboard = function({jobs, onStatusChange, onDelJob}){
    const columns = [
    
    "company",
    "Position",
    "status",
    "Application_Date",
    "Salary",
    "Next_Action",
    "Website",
    "Contact",
    "Ref_Link"
    ];
    return(
        <div className="dashboard">
            {
                jobs.length === 0 ? (<p>There are no jobs you Applied for.</p>):
                (<table>
                <thead>
                    <tr>
                        {columns.map((val)=> <th key={val} className="border-2 p-1.5"><span>{val}</span></th>)}
                        <th key={"del"} className="border-2 p-1.5"><span>Remove</span></th>
                    </tr>
                </thead>
                <tbody> 
                    {jobs.map((jobObj)=> <tr key={jobObj.id}>{columns.map((column)=>
                        <td key={column} className="border-2 p-1.5">
                            {
                                column !== "status"? <span>{jobObj[column]}</span> :
                                <select  value={jobObj["status"]} onChange={(e)=> onStatusChange(jobObj.id, e.target.value )}>
                                    <option value="">--Application Status--</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewed">Interviwed</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Offered">Offered</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            }
                            
                        </td>
                    )}
                        <td key={"del"} className="border-2 p-1.5"><span ><button className="cursor-pointer" onClick={()=> onDelJob(jobObj.id)}>Del</button></span></td>
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