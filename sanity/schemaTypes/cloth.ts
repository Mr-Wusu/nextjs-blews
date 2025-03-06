import { defineField, defineType } from "sanity";
import { GiClothes } from "react-icons/gi";

export const cloth = defineType({
  name: "cloth",
  title: "Cloth",
  type: "document",
  icon: GiClothes,
  fields: [
    defineField({
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ]
});
