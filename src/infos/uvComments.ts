import type { UvComment } from "../types";


const uvIndexComments: UvComment[] = [
  { min: 0, max: 2, comment: "Low risk" },
  { min: 3, max: 5, comment: "Moderate" },
  { min: 6, max: 7, comment: "High" },
  { min: 8, max: 10, comment: "Very High" },
  { min: 11, max: Infinity, comment: "Extreme" }
];


export const getUvComment = (uvIndex: string | undefined): string | undefined => {
    const  uvIndexNumber = parseInt(uvIndex as unknown as string);
    const uvComment = uvIndexComments.find((uv) => uvIndexNumber >= uv.min && uvIndexNumber <= uv.max);
    return uvComment?.comment;
}