import { useState } from "react";

const emptyJob = {
    company: "",
    Position: "",
    status: "Applied",
    Application_Date: "",
    Salary: "",
    Next_Action: "",
    Website: "",
    Contact: "",
    Ref_Link: ""
};

const fields = [
    { name: "company", label: "Company", type: "text", required: true },
    { name: "Position", label: "Position", type: "text", required: true },
    { name: "status", label: "Status", type: "select" },
    { name: "Application_Date", label: "Application Date", type: "date" },
    { name: "Salary", label: "Salary", type: "text" },
    { name: "Next_Action", label: "Next Action", type: "text" },
    { name: "Website", label: "Website", type: "text" },
    { name: "Contact", label: "Contact", type: "text" },
    { name: "Ref_Link", label: "Reference Link", type: "text" }
];

const InputJob = function({onAdd}){
    const [job, setJob] = useState({...emptyJob});

    function handleChange(e) {
        const { name, value } = e.target;

        setJob((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();

        if (!job.company.trim() || !job.Position.trim()) {
            return;
        }

        const newJob = {
            id: crypto.randomUUID(),
            ...job
        };

        onAdd(newJob);
        setJob({ ...emptyJob });

    }
    return(
        <form className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Add New Application
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {fields.map(({name, label, type, required})=>(
                (type === "select")?
                <div key={name} className="flex flex-col gap-2">
                    <label htmlFor={name} className="text-sm font-medium text-slate-700">{label}</label>
                    <select
                        name={name} 
                        id={name} 
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        value={job[name]} 
                        onChange={handleChange}
                        >
                        <option value="">--Application Status--</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Selected">Selected</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                :
                <div key={name} className="flex flex-col gap-2">
                    <label htmlFor={name} className="text-sm font-medium text-slate-700">{label}</label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={job[name]}
                        onChange={handleChange}
                        required={required ?? false}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                ))}

            </div>
                <div className="mt-6 flex justify-end">
                    <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Add application
                    </button>
                </div>

        </form>
    );
}

export default InputJob;