
import { useNavigate, useParams } from "react-router-dom";
import { getCohortById, updateCohortStatus } from "../../shared/services/cohortService";
import { useEffect, useState } from "react";
import type { CohortResponse, CohortUpdateStatus } from "../../shared/types";
import { toast } from "react-toastify";
import { CohortStatus } from "../../shared/enums/Enums";
import { getEnumKeyValue } from "../../shared/utilis/enumToArray";

const GetCohortDetails = () => {

    const [cohort, SetCohort] = useState<CohortResponse>();
    const navigate=useNavigate();
    const { id } = useParams();

    const fetchById = async () => {
        const response = await getCohortById(id as string);

        if (response.isSuccess) {
            SetCohort(response.data);
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    const updateStatus = async (id: string, status: CohortStatus) => {

        const model: CohortUpdateStatus = {
            id: id,
            status: status
        };

        const response = await updateCohortStatus(id, model);

        if (response.isSuccess) {
            toast.success(response.message);
            fetchById();
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    useEffect(() => {
        fetchById();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-3xl">

                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Cohort Details
                </h1>

                {cohort && (

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="mb-1 text-2xl font-bold text-gray-900">
                            {cohort.name}
                        </h2>

                        <p className="mb-6 text-indigo-600 font-medium">
                            {cohort.courseName}
                        </p>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Cohort Name
                                </label>
                                <p className="mt-1 text-gray-900">{cohort.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Course Name
                                </label>
                                <p className="mt-1 text-gray-900">{cohort.courseName}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Capacity
                                </label>
                                <p className="mt-1 text-gray-900">{cohort.capacity} Students</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Classes Per Week
                                </label>
                                <p className="mt-1 text-gray-900">{cohort.classesPerWeek}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Duration
                                </label>
                                <p className="mt-1 text-gray-900">{cohort.durationWeeks} Weeks</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Current Status
                                </label>
                                <p className="mt-1 font-semibold text-indigo-600">
                                    {CohortStatus[cohort.status]}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Start Date
                                </label>
                                <p className="mt-1 text-gray-900">
                                    {new Date(cohort.startDate).toDateString()}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    End Date
                                </label>
                                <p className="mt-1 text-gray-900">
                                    {new Date(cohort.endDate).toDateString()}
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 border-t pt-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Overview
                            </label>

                            <p className="text-sm leading-6 text-gray-600">
                                {cohort.overview || "No overview available"}
                            </p>

                        </div>

                        <div className="mt-6 border-t pt-5">

                            <label className="mb-2 block font-semibold text-gray-700">
                                Update Cohort Status
                            </label>

                            <select
                                id="cohortStatus"
                                defaultValue={cohort.status}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500"
                            >
                                {getEnumKeyValue(CohortStatus).map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.value as any}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => {
                                    const status = document.getElementById(
                                        "cohortStatus"
                                    ) as HTMLSelectElement;

                                    updateStatus(
                                        cohort.id,
                                        Number(status.value) as CohortStatus
                                    );
                                }}
                                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                            >
                                Update Status
                            </button>
                             
                            <button
                                onClick={() => {
                                 navigate('/update-cohort/'+cohort.id)
                                }}
                                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                            >
                                Update Cohort Details
                            </button>
                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default GetCohortDetails;
