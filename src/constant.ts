require('dotenv').config()

export const __prod__ = process.env.NODE_ENV === 'production';
export const API_BASE_URL = process.env.API_BASE_URL || '/api/v1'

export const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
export const DB_DATABASE = (__prod__ ? process.env.DB_DATABASE_PROD : process.env.DB_DATABASE_DEV) || 'bookstore_dev';
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';

export const PORT = process.env.PORT || '4000';

export const COOKIE_NAME = "qid"
export const FORGET_PASSWORD_PREFIX = "forget-password";