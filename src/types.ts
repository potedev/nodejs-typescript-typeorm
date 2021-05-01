declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'test' | 'production';
            PORT?: string;
            DB_DATABASE: string;
            DB_DIALECT: 'mysql';
            DB_USERNAME: string;
            DB_PASSWORD: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }