
import { useEffect, useState } from "react";
import type { CohortResponse } from "../../shared/types";
import { getAllCohorts } from "../../shared/services/cohortService";
import { toast } from "react-toastify";
import { CohortStatus } from "../../shared/enums/Enums";
import { useNavigate } from "react-router-dom";

const GetAllCohorts = () => {

    const [cohorts, SetCohorts] = useState<CohortResponse[]>([]);
    const navigate=useNavigate();

    const fetchAllCohorts = async () => {
        const response = await getAllCohorts();

        if (response.isSuccess) {
            SetCohorts(response.data);
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    useEffect(() => {
        fetchAllCohorts();
    }, []);





    return (
        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">

            {cohorts.length === 0 ? (
                <h1>No Cohorts Created Yet</h1>
            ) : (
                cohorts.map((cohort) => (
                    <div key={cohort.id} className="rounded-xl border bg-white p-5 shadow-sm">

                        <h2 className="text-xl font-bold">{cohort.name}</h2>

                        <p className="mt-1 text-indigo-600">{cohort.courseName}</p>

                        <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p><b>Capacity:</b> {cohort.capacity}</p>
                            <p><b>Classes Per Week:</b> {cohort.classesPerWeek}</p>
                            <p><b>Duration:</b> {cohort.durationWeeks} Weeks</p>
                            <p><b>Overview:</b> {cohort.overview}</p>
                            <p><b>Status:</b> {CohortStatus[cohort.status]}</p>
                            <p><b>Start Date:</b> {new Date(cohort.startDate).toDateString()}</p>
                            <p><b>End Date:</b> {new Date(cohort.endDate).toDateString()}</p>
                        </div>

                        
<button
    onClick={() => {
         navigate('/cohort/'+cohort.id)
    }}
    className="mt-3 w-full rounded-lg border border-indigo-600 px-4 py-2 font-semibold text-indigo-600 hover:bg-indigo-50"
>
    View Details
</button>
                        </div>

                   
                ))
            )}

        </div>
    );
};

export default GetAllCohorts;
