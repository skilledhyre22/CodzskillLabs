
import { useEffect, useState } from "react"
import type { CohortResponse } from "../../shared/types"
import {  getPublishedCohorts } from "../../shared/services/cohortService"
import { toast } from "react-toastify"
import { CohortStatus } from "../../shared/enums/Enums"
import { useNavigate } from "react-router-dom"

const GetApprovedCohorts = () => {
    const [cohorts, SetCohorts] = useState<CohortResponse[]>([])
    const navigate=useNavigate();

    const fetchApprovedCohorts = async () => {
        const response = await getPublishedCohorts();

        if (response.isSuccess) {
            SetCohorts(response.data)
            console.log(response)
        }
        else {
            toast.error(response.problemDetails?.title)
        }
    }

    

    useEffect(() => {
        fetchApprovedCohorts();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-6">

        <button onClick={()=>navigate("/add-cohort")}>Create Cohort</button>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    My Cohorts
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage and view your published cohorts.
                </p>
            </div>

            {/* Cohort Count */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                    Published Cohorts
                </h2>

                <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                    {cohorts.length} Cohorts
                </span>
            </div>

            {/* Cohort Cards */}
            {cohorts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {cohorts.map((cohort) => (
                        <div
                            key={cohort.id}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Card Header */}
                            <div className="mb-4 flex items-start justify-between gap-3">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {cohort.name}
                                </h3>

                                <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    {CohortStatus[cohort.status]}
                                </span>
                            </div>

                            {/* Overview */}
                            <p className="mb-5 line-clamp-3 min-h-[60px] text-sm leading-6 text-gray-500">
                                {cohort.overview || "No overview available."}
                            </p>

                            {/* Details */}
                            <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Capacity
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {cohort.capacity} Students
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Duration
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {cohort.durationWeeks} Weeks
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Classes Per Week
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {cohort.classesPerWeek} Classes
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Status
                                    </p>
                                    <p className="mt-1 font-semibold text-green-600">
                                        Published
                                    </p>
                                </div>

                            </div>

                            {/* Dates */}
                            <div className="mt-4 flex justify-between gap-3">
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Start Date
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {new Date(cohort.startDate).toLocaleDateString("en-IN")}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        End Date
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {new Date(cohort.endDate).toLocaleDateString("en-IN")}
                                    </p>
                                </div>
                              
                            </div>

                        </div>
                    ))}

                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">
                        No Published Cohorts
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Your approved cohorts will appear here once published by Admin.
                    </p>
                </div>
            )}

        </div>
    )
}

export default GetApprovedCohorts
