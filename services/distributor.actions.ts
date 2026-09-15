import { distributorSchema, type DistributorInput } from '../schemas/distributor.schema';
import { signupDistributor } from './distributor.service';

export function signupDistributorAction(input: DistributorInput) {
  return signupDistributor(distributorSchema.parse(input));
}
