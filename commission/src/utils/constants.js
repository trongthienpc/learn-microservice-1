export const OK = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const SERVER_ERROR = 500;

// Login
export const LOGIN_SUCCESS = "Login succeeded";
export const LOGIN_INVALID = "Invalid email or password";
export const LOGIN_INVALID_CODE = 401;

// Register
export const USERNAME_EXIST = "The username is already in use by another!";
export const EMAIL_EXIST = "The email is already in use by another!";
export const REGISTER_SUCCESS = "Register succeeded";
export const REGISTER_DUPLICATE_EMAIL = "Email has already been taken";
export const REGISTER_INVALID_CODE = 400;

// Logout
export const LOGOUT_SUCCESS = "Logout succeeded";
export const LOGOUT_FAIL = "Logout failed";
export const LOGOUT_INVALID_CODE = 400;

// Refresh token
export const REFRESH_TOKEN_INVALID = "Invalid refresh token";
export const REFRESH_TOKEN_SUCCESS = "Refresh token succeeded";
export const REFRESH_TOKEN_INVALID_CODE = 400;

// token
export const TOKEN_INVALID = "Invalid token";
export const TOKEN_SUCCESS = "Token succeeded";
export const TOKEN_INVALID_CODE = 400;

//
export const ACCESS_DENIED = "Access denied";

// PERMISSION - RESOURCE
export const READ = "read";
export const CREATE = "create";
export const UPDATE = "update";
export const DELETE = "delete";

export const ROLE = "role";
export const PERMISSION = "permission";
export const ROLE_PERMISSION = "role-permission";
export const GROUP = "group";
export const GROUP_ROLE = "group-role";
export const ACCOUNT = "account";
export const GROUP_ACCOUNT = "group-account";
export const BRANCH = "branch";
export const SERVICE = "service";
export const PRICE = "price";
export const TRANSACTION = "transaction";
export const COMMISSION = "commission";
export const COMMISSION_TARGET = "commission-target";
export const SERVICE_COMMISSION = "service-commission";
export const STAFF = "staff";
export const DEPARTMENT = "department";
export const LEVEL = "level";
