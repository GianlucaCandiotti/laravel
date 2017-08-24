import Laravel from 'utils/laravel';

const route = rel => (
  rel
    ? `${Laravel.baseUrl}/${rel}`
    : Laravel.baseUrl
);

export default route;
