import {reviewInputSchema,type ReviewInput} from '../schemas/review.schema';
import {reviewsService} from './reviews.service';
export function submitReview(input:ReviewInput,token:string){return reviewsService.create(reviewInputSchema.parse(input),token);}
