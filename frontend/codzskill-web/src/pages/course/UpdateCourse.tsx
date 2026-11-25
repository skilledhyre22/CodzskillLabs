
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { courseUpdateSchema } from "../../shared/types/schema/course/CourseUpdateRequest";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, updateCourse } from "../../shared/services/courseService";
import type { CourseUpdateRequest } from "../../shared/types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getEnumKeyValue } from "../../shared/utilis/enumToArray";
import { CourseCategory } from "../../shared/enums/Enums";

const UpdateCourse = () => {
    const navigate=useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CourseUpdateRequest>({
        resolver: zodResolver(courseUpdateSchema)
    });

    const { id } = useParams();

    const fetchById = async () => {
        const response = await getCourseById(id as string);

        if (response.isSuccess) {
            reset({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                badgeLabel: response.data.badgeLabel,
                category: response.data.category,
                price: response.data.price
            });
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    const submit = async (model: CourseUpdateRequest) => {

        const response = await updateCourse(id as string, model);

        if (response.isSuccess) {
            toast.success(response.message);
           
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    useEffect(() => {
        if (id) {
            fetchById();
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">

            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Course Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-gray-900">
                        Update Course
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Modify your course information below.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
                >

                    <input type="hidden" {...register("id")} />

                    <div className="space-y-6">

                        {/* Course Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Course Title
                            </label>

                            <input
                                type="text"
                                {...register("title")}
                                placeholder="Enter course title"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Description
                            </label>

                            <textarea
                                {...register("description")}
                                rows={5}
                                placeholder="Enter course description"
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Category and Price */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Category
                                </label>

                                <select
                                    {...register("category", {
                                        valueAsNumber: true
                                    })}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">Select Category</option>

                                    {getEnumKeyValue(CourseCategory).map((course) => (
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
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Course Price
                                </label>

                                <input
                                    type="number"
                                    {...register("price", {
                                        valueAsNumber: true
                                    })}
                                    placeholder="Enter price"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Badge */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Badge Label
                            </label>

                            <input
                                type="text"
                                {...register("badgeLabel")}
                                placeholder="Example: Bestseller"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                    </div>

                    {/* Submit */}
                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Updating..." : "Update Course"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateCourse;
