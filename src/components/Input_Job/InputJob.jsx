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
        <form className="flex flex-wrap justify-center gap-2.5 m-2" onSubmit={handleSubmit}>
            {fields.map(({name, label, type, required})=>(
                (type === "select")?
                <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <select name={name} id={name} className="border-2" value={job[name]} onChange={handleChange}>
                        <option value="">--Application Status--</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewed">Interviwed</option>
                        <option value="Selected">Selected</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                :
                <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={job[name]}
                        onChange={handleChange}
                        required={required ?? false}
                        className="p-1 border-2"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="p-1 border-2 rounded-xl"
            >
                Add application
            </button>
        </form>
    );
}

export default InputJob;