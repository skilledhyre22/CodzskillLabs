
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import type { CohortUpdateRequest } from "../../shared/types";
import { getCohortById, updateCohort } from "../../shared/services/cohortService";
import { toast } from "react-toastify";

const UpdateCohort = () => {

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CohortUpdateRequest>();

    const fetchById = async () => {

        const response = await getCohortById(id as string);
        console.log(response)

        if (response.isSuccess) {

            reset({
                id: response.data.id,
                
                name: response.data.name,
                overView: response.data.overview,
                capacity: response.data.capacity,
                classesPerWeek: response.data.classesPerWeek,
                durationWeeks: response.data.durationWeeks,
                 startDate: new Date(response.data.startDate).toISOString().split("T")[0],
                 endDate: new Date(response.data.endDate).toISOString().split("T")[0]
            });

        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    const submit = async (model: CohortUpdateRequest) => {

        const response = await updateCohort(id as string, model);

        if (response.isSuccess) {
            toast.success(response.message);
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    useEffect(() => {
        fetchById();
    }, []);

    const inputStyle =
        "w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500";

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-2xl">

                <div className="rounded-xl border bg-white p-6 shadow-sm">

                    <h1 className="mb-6 text-2xl font-bold text-gray-900">
                        Update Cohort
                    </h1>

                    <form onSubmit={handleSubmit(submit)} className="space-y-5">

                        <input type="hidden" {...register("id")} />


                        {/* Cohort Name */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Cohort Name
                            </label>

                            <input
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                className={inputStyle}
                                placeholder="Enter cohort name"
                            />

                            <p className="text-sm text-red-500">
                                {errors.name?.message}
                            </p>
                        </div>

                        {/* Overview */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Overview
                            </label>

                            <textarea
                                {...register("overView")}
                                className={inputStyle}
                                rows={4}
                                placeholder="Enter overview"
                            />
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Capacity
                            </label>

                            <input
                                type="number"
                                {...register("capacity", {
                                    required: "Capacity is required",
                                    valueAsNumber: true,
                                    min: 1
                                })}
                                className={inputStyle}
                            />

                            <p className="text-sm text-red-500">
                                {errors.capacity?.message}
                            </p>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Duration (Weeks)
                            </label>

                            <input
                                type="number"
                                {...register("durationWeeks", {
                                    required: "Duration is required",
                                    valueAsNumber: true,
                                    min: 1
                                })}
                                className={inputStyle}
                            />
                        </div>

                        {/* Classes Per Week */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Classes Per Week
                            </label>

                            <input
                                type="number"
                                {...register("classesPerWeek", {
                                    required: "Classes per week is required",
                                    valueAsNumber: true,
                                    min: 1
                                })}
                                className={inputStyle}
                            />
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                Start Date
                            </label>

                            <input
                                type="date"
                                {...register("startDate", {
                                    required: "Start date is required"
                                })}
                                className={inputStyle}
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="mb-2 block font-semibold">
                                End Date
                            </label>

                            <input
                                type="date"
                                {...register("endDate", {
                                    required: "End date is required"
                                })}
                                className={inputStyle}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                        >
                            Update Cohort
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default UpdateCohort;
