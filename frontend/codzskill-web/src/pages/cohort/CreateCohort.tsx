
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { CohortRequest, CourseResponse } from "../../shared/types";
import { createCohort } from "../../shared/services/cohortService";
import { getAllCourses } from "../../shared/services/courseService";

const CreateCohort = () => {
    const [courses, setCourses] = useState<CourseResponse[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CohortRequest>();

    const GetallCourses = async () => {
        const response = await getAllCourses();

        if (response.isSuccess) {
            setCourses(response.data);
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    const submit = async (model: CohortRequest) => {
        const response = await createCohort(model);

        if (response.isSuccess) {
            toast.success(response.message);
            reset();
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    useEffect(() => {
        GetallCourses();
    }, []);

    const inputStyle =
        "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

    const labelStyle =
        "mb-2 block text-sm font-semibold text-gray-700";

    return (
        <div className="min-h-screen bg-gray-50 p-5 md:p-8">

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-indigo-600">
                        Trainer Dashboard / Cohorts
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Create New Cohort
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Create and configure a new learning cohort for your students.
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)}>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* Main Form */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Basic Information */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Basic Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the basic details of your cohort.
                                    </p>
                                </div>

                                <div className="space-y-5">

                                    {/* Cohort Name */}
                                    <div>
                                        <label className={labelStyle}>
                                            Cohort Name *
                                        </label>

                                        <input
                                            {...register("name", {
                                                required: "Cohort name is required"
                                            })}
                                            placeholder="e.g. ASP.NET Core Weekend Batch"
                                            className={inputStyle}
                                        />

                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Course */}
                                    <div>
                                        <label className={labelStyle}>
                                            Select Course *
                                        </label>

                                        <select
                                            {...register("courseId", {
                                                required: "Please select a course"
                                            })}
                                            className={inputStyle}
                                        >
                                            <option value="">
                                                Select a course
                                            </option>

                                            {courses.map((course) => (
                                                <option
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.courseId && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.courseId.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Overview */}
                                    <div>
                                        <label className={labelStyle}>
                                            Overview *
                                        </label>

                                        <textarea
                                            {...register("overView", {
                                                required: "Overview is required"
                                            })}
                                            rows={4}
                                            placeholder="Describe what candidates will learn in this cohort..."
                                            className={inputStyle}
                                        />

                                        {errors.overView && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.overView.message}
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Duration and Schedule */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Duration & Schedule
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Configure your cohort timeline and class frequency.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                    {/* Start Date */}
                                    <div>
                                        <label className={labelStyle}>
                                            Start Date *
                                        </label>

                                        <input
                                            type="date"
                                            {...register("startDate", {
                                                required: "Start date is required"
                                            })}
                                            className={inputStyle}
                                        />

                                        {errors.startDate && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.startDate.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* End Date */}
                                    <div>
                                        <label className={labelStyle}>
                                            End Date *
                                        </label>

                                        <input
                                            type="date"
                                            {...register("endDate", {
                                                required: "End date is required"
                                            })}
                                            className={inputStyle}
                                        />

                                        {errors.endDate && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.endDate.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Duration Weeks */}
                                    <div>
                                        <label className={labelStyle}>
                                            Duration (Weeks) *
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            {...register("durationWeeks", {
                                                required: "Duration is required",
                                                valueAsNumber: true,
                                                min: {
                                                    value: 1,
                                                    message: "Minimum 1 week"
                                                }
                                            })}
                                            placeholder="e.g. 8"
                                            className={inputStyle}
                                        />

                                        {errors.durationWeeks && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.durationWeeks.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Classes Per Week */}
                                    <div>
                                        <label className={labelStyle}>
                                            Classes Per Week *
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            {...register("classesPerWeek", {
                                                required: "Classes per week is required",
                                                valueAsNumber: true,
                                                min: {
                                                    value: 1,
                                                    message: "Minimum 1 class"
                                                }
                                            })}
                                            placeholder="e.g. 3"
                                            className={inputStyle}
                                        />

                                        {errors.classesPerWeek && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.classesPerWeek.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Capacity */}
                                    <div className="sm:col-span-2">
                                        <label className={labelStyle}>
                                            Maximum Capacity *
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            {...register("capacity", {
                                                required: "Capacity is required",
                                                valueAsNumber: true,
                                                min: {
                                                    value: 1,
                                                    message: "Capacity must be at least 1"
                                                }
                                            })}
                                            placeholder="e.g. 30"
                                            className={inputStyle}
                                        />

                                        {errors.capacity && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.capacity.message}
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                                >
                                    Reset
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                >
                                    Create Cohort
                                </button>

                            </div>

                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">

                            {/* Info Card */}
                            <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-sm">

                                <p className="text-sm font-medium text-indigo-100">
                                    Cohort Creation
                                </p>

                                <h3 className="mt-3 text-xl font-bold">
                                    Build a Learning Experience
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-indigo-100">
                                    Create your cohort under an approved course.
                                    Once submitted, it will be sent to Admin for approval.
                                </p>

                                <div className="mt-6 rounded-xl bg-white/10 p-4">
                                    <p className="text-sm font-semibold">
                                        Approval Process
                                    </p>

                                    <p className="mt-2 text-xs leading-5 text-indigo-100">
                                        Create Cohort → Admin Review → Approved → Published
                                    </p>
                                </div>

                            </div>

                            {/* Checklist */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                <h3 className="font-bold text-gray-900">
                                    Before You Submit
                                </h3>

                                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                                    <li>✓ Select an approved course</li>
                                    <li>✓ Enter accurate cohort dates</li>
                                    <li>✓ Set the correct duration</li>
                                    <li>✓ Define student capacity</li>
                                    <li>✓ Provide a clear overview</li>
                                </ul>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateCohort;
