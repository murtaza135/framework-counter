import { api } from '@/api/api';

export const counterIncrementMutation = () => ({
  mutationFn: (data) => api.patch("counter", { json: { value: data } }).json(),
  invalidateTags: ["counter"],
  transformer: (data) => data.value
});
