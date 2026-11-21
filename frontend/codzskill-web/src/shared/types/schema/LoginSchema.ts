import z from "zod";

export const loginSchema=z.object({
    email:z.string().nonempty("Email is Required"),
    password:z.string().nonempty("Password is Required")
})