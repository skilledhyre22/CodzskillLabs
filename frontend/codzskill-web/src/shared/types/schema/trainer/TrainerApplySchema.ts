import z from "zod";

export const TrainerApplySchema=z.object({
  fullName:z.string().nonempty("FullName is Required"),
  email:z.string().nonempty("Email is Required"),
  password:z.string().nonempty("Password is Required"),
  primarySkill:z.string().nonempty("SkillSet is Required"),
  yearsOfExperience:z.number("Experience is Required"),
})


export const TrainerUpdateSchema=z.object({
  id:z.string().nonempty(),
  primarySkill:z.string().nonempty("SkillSet is Required"),
  yearsOfExperience:z.number("Experience is Required"),
})