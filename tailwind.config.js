/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    // These paths are just examples, customize them to match your project structure
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    theme: {
        boxShadow: {
            sm: '0 0 2px 2px gray',
            bottom: '0px 1px 3px 1px',
        },
    },
    // ...
};
