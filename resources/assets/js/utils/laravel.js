// A global variable that contains useful Laravel information. The properties listed in
// here are are shared between all views. More properties could be injected via
// /views/injectors, or just by adding new properties to the window.Laravel variable.
//
// Properties:
// csrfToken: String with csrf token. Same as csrf_token().
// baseUrl: String with the base path of the application. Same as url('').
// currentUrl: String with the current url. Useful to handle the active route.
// isGuest: Boolean to verify whether a user is a guest or not.
// user: Object with Auth::user()->name and Auth::user()->email. Only available if a User
// is authenticated.
// errors: Array with Laravel errors for each key.
// oldInputs: Array with old inputs.

// eslint-disable-next-line no-undef
const Laravel = window.Laravel || {};

export default Laravel;
