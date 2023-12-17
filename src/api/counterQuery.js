import { api } from '@/api/api';

export const counterQuery = () => ({
  queryFn: () => api.get("counter").json(),
  tag: "counter",
  transformer: (data) => data.value
});
