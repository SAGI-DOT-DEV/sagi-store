import { apiRequest } from './api-client';
import type { DistributorInput } from '../schemas/distributor.schema';

export function signupDistributor(input: DistributorInput) {
  return apiRequest('/api/v1/distributors/signup', { method: 'POST', body: JSON.stringify(input) });
}
