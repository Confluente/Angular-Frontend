// For production on the live server, create a file next to this file called "environment.prod.ts" and copy over the
// contents.
// When serving the frontend using "ng serve --configuration=production" the "environment.prod.ts" the application will
// use the variables in this file instead of the standard "environment.ts" file.

export const environment = {
    production: true,
    ROOT_URL: "https://www.hsaconfluente.nl:81",
};
