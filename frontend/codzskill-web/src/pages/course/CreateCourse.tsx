
import { useForm } from "react-hook-form";
import type { CourseRequest } from "../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../../shared/types/schema/course/CourseRequestSchema";
import { createCourse } from "../../shared/services/courseService";
import { toast } from "react-toastify";
import { getEnumKeyValue } from "../../shared/utilis/enumToArray";
import { CourseCategory } from "../../shared/enums/Enums";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<CourseRequest>({
        resolver: zodResolver(courseSchema)
    });

    const submit = async (model: CourseRequest) => {
        const response = await createCourse(model);

        if (response.isSuccess) {
            toast.success(response.message);
            //  navigate("/get-all-courses")
            reset();
        } else {
            toast.error(response.problemDetails?.title);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <h1 className="mt-2 text-3xl font-bold text-gray-900">
                        Create New Course
                    </h1>
                
                    <p className="mt-2 text-gray-500">
                        Add course details and submit your course for review.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Basic Information
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the basic details of your course.
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Course Title *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Complete ASP.NET Core Web API"
                            {...register("title")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Describe what students will learn..."
                            {...register("description")}
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Course Category *
                            </label>
                            <select
                                {...register("category", { valueAsNumber: true })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                                <option value="">Select category</option>
                                {getEnumKeyValue(CourseCategory).map(course => (
                                    <option key={course.key} value={course.key}>
                                        {course.value as any}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Course Price (₹) *
                            </label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                {...register("price", { valueAsNumber: true })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Badge Label
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Bestseller, Trending, New"
                            {...register("badgeLabel")}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                        {errors.badgeLabel && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.badgeLabel.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Clear Form
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Creating..." : "Create Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
