import { api } from '@/api/api';

export const counterIncrementMutation = () => ({
  mutationFn: (data) => api.put("counter", { json: { value: data } }).json(),
  invalidateTags: ["counter"],
  transformer: (data) => data.value
});
