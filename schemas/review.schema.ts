import {z} from 'zod';
const rating=z.number().int().min(1,'Choose a rating.').max(5);
export const reviewInputSchema=z.object({orderId:z.string().cuid(),overallRating:rating,deliveryRating:rating.optional(),checkoutRating:rating.optional(),comment:z.string().trim().min(1).max(2000).optional()});
export const reviewSchema=z.object({id:z.string(),orderId:z.string(),overallRating:rating,deliveryRating:rating.nullable(),checkoutRating:rating.nullable(),comment:z.string().nullable()});
export type ReviewInput=z.infer<typeof reviewInputSchema>;
export type ExperienceReview=z.infer<typeof reviewSchema>;
