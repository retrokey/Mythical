module.exports = {
    content:  [
        './src/assets/template/index.html',
        './src/components/**/*.tsx',
        './src/components/**/**/*.tsx',
        './src/components/**/**/**/*.tsx'
    ],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        }
    }
}