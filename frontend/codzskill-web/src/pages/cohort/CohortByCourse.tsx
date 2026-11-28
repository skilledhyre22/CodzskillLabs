
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CohortResponse } from "../../shared/types";
import { getCohortByCourseId } from "../../shared/services/cohortService";
import { toast } from "react-toastify";
import { CohortStatus } from "../../shared/enums/Enums";

const CohortByCourse = () => {
    const { id } = useParams();
    const [cohort, SetCohort] = useState<CohortResponse[]>([]);

    const fetchCohortByCourse = async () => {
        const response = await getCohortByCourseId(id as string);

        if (response.isSuccess) {
            SetCohort(response.data);
            console.log(response)
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    useEffect(() => {
        fetchCohortByCourse();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="mb-2 text-2xl font-bold text-gray-800">
                Course Cohorts
            </h1>

            <p className="mb-6 text-sm text-gray-500">
                View all cohorts created for this course.
            </p>

            {cohort.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {cohort.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="text-lg font-bold text-gray-800">
                                    {item.name}
                                </h2>

                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {CohortStatus[item.status]}
                                </span>
                            </div>

                            <p className="mb-5 min-h-[60px] text-sm leading-6 text-gray-500">
                                {item.overview || "No overview available."}
                            </p>

                            <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4">

                                <div>
                                    <p className="text-xs text-gray-400">Capacity</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {item.capacity} Students
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Duration</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {item.durationWeeks} Weeks
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Classes / Week</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {item.classesPerWeek}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Course</p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {item.courseName}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-4 flex justify-between gap-3">
                                <div>
                                    <p className="text-xs text-gray-400">Start Date</p>
                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {new Date(item.startDate).toLocaleDateString("en-IN")}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">End Date</p>
                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {new Date(item.endDate).toLocaleDateString("en-IN")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                    <h2 className="font-semibold text-gray-700">
                        No Cohorts Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        No cohorts have been created for this course yet.
                    </p>
                </div>
            )}

        </div>
    );
};

export default CohortByCourse;
