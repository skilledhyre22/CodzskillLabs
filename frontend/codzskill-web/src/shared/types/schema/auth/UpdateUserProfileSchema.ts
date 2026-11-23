import z from "zod";

export const UpdateUserProfileSchema=z.object({
    firstName:z.string().nonempty("FirstName is required"),
    lastName:z.string().nonempty("LastName is required")
})