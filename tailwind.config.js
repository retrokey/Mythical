module.exports = {
    content: [
        './src/components/**/*.tsx',
        './public/index.html',
    ],
    darkMode: 'class',
    theme: {
        screens: {
            mobileSmall: {
                'raw': '(min-width: 320px)'
            },
            mobileMedium: {
                'raw': '(min-width: 320px)'
            },
            mobileLarge: {
                'raw': '(min-width: 425px)'
            },
            tablet: {
                'raw': '(min-width: 768px)'
            },
            laptop: {
                'raw': '(min-width: 1024px)'
            },
            laptopLarge: {
                'raw': '(min-width: 1440px)'
            },
            ultra: {
                'raw': '(min-width: 2560px)'
            }
        },
        fontFamily: {
            'inter': ['Inter']
        },
        extend: {
            fontFamily: {
                'inter': ['Inter']
            },
            boxShadow: {
                'dc': 'inset -1px -1px #5a556a',
                'adm': 'inset -1px -1px #b04238'
            },
            colors: {
                'gray': '#98AABF',
                'white': '#FFFFFF',
                'black': '#27272A',
                'yellow': '#FFC439',
                'credits': '#E9B124',
                'duckets': '#CD7BBF',
                'diamonds': '#4AA78F',
                'not0': '#4ADE80',
                'count-light': '#F7F7F7',
                'count-dark': '#3F3F46',
                'offline': '#FF9696',
                'online': '#4ADE80',
                'purple': '#716A85',
                'red': '#DD5246'
            },
            backgroundImage: {
                'gradient': 'url(/images/guest/gradient.png)',
                'left': 'url(/images/guest/left.png)',
                'right': 'url(/images/guest/right.png)',
                'drape': 'url(/images/guest/drape.png)',
                'back-light': 'url(/images/nav/back_light.png)',
                'profile-light': 'url(/images/nav/profile_light.png)',
                'staff-light': 'url(/images/nav/staff_light.png)',
                'news-light': 'url(/images/nav/news_light.png)',
                'settings-light': 'url(/images/nav/settings_light.png)',
                'back-dark': 'url(/images/nav/back_dark.png)',
                'profile-dark': 'url(/images/nav/profile_dark.png)',
                'staff-dark': 'url(/images/nav/staff_dark.png)',
                'news-dark': 'url(/images/nav/news_dark.png)',
                'settings-dark': 'url(/images/nav/settings_dark.png)',
                'search': 'url(/images/profile/search.png)',
                'count': 'url(/images/profile/count.png)',
                'staff-bg': 'url(/images/staff/avatarBg.png)',
                'credits-url': 'url(/images/profile/credits.png)',
                'duckets-url': 'url(/images/profile/duckets.png)',
                'diamonds-url': 'url(/images/profile/diamonds.png)'
            }
        },
    },
    plugins: []
}