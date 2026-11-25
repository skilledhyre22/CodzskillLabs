
import { useForm } from "react-hook-form";
import type { CourseUpdateStatus } from "../../shared/types";
import { useNavigate, useParams } from "react-router-dom";
import { updateStatus } from "../../shared/services/courseService";
import { toast } from "react-toastify";
import { getEnumKeyValue } from "../../shared/utilis/enumToArray";
import { CourseStatus } from "../../shared/enums/Enums";

const UpdateCourseStatus = () => {
    const { id } = useParams();
    const navigate=useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<CourseUpdateStatus>();

    const changeStatus = async (model: CourseUpdateStatus) => {
        const response = await updateStatus(id as string, model);

        if (response.isSuccess) {
            toast.success(response.message);
            navigate("/get-all-courses")
        }
        else {
            toast.error(response.problemDetails?.title);
        }
    };

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                    Admin Management
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Update Course Status
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Change the approval status of this course.
                </p>
            </div>

            <form onSubmit={handleSubmit(changeStatus)}>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Select Course Status
                    </label>

                    <select
                        {...register("status", {
                            valueAsNumber:true,
                            required: "Please select course status"
                        },
                        
                    )}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                        <option value="">Select Status</option>

                        {getEnumKeyValue(CourseStatus).map((course) => (
                            <option key={course.key} value={course.key}>
                                {course.value as any}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Updating..." : "Update Status"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateCourseStatus;
