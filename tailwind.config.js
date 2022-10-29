module.exports = {
    content: [
        './src/components/**/*.tsx',
        './public/index.html',
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            'inter': ['Inter']
        },
        extend: {
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
                'online': '#4ADE80'
            },
            width: {
                '7px': '7px',
                '411px': '411px',
                '12px': '12px',
                '90%': '90%',
                '14px': '14px',
                '24px': '24px',
                '16px': '16px',
                '20px': '20px',
                '18px': '18px',
                '336px': '336px',
                '24px': '24px',
                '128px': '128px',
                '79px': '79px',
                '138px': '138px',
                '105px': '105px',
                '54px': '54px',
                '40px': '40px',
                '80px': '80px',
                '327px': '327px',
                '292px': '292px',
                '88px': '88px',
                '51px': '51px',
                '168px': '168px',
                '72px': '72px',
                '64px': '64px'
            },
            inset: {
                '120px': '120px',
                '125px': '125px',
                '140px': '140px',
                '86px': '86px',
                '230px': '230px',
                '290px': '290px',
                '38px': '38px',
                '30px': '30px',
                'friends': '350px',
                'rooms': '500px',
                '35px': '35px',
                '15px': '15px',
                '20px': '20px',
                '25px': '25px',
                '45px': '45px',
                '12px': '12px',
                '50px': '50px',
                '30%': '30%'
            },
            height: {
                '7px': '7px',
                '8px': '8px',
                '12px': '12px',
                '20px': '20px',
                '16px': '16px',
                '18px': '18px',
                '19px': '19px',
                '17px': '17px',
                '53px': '53px',
                '24px': '24px',
                '220px': '220px',
                '31px': '31px',
                '93px': '93px',
                '40px': '40px',
                '154px': '154px',
                '85px': '85px',
                '15px': '15px',
                '266px': '266px',
                '233px': '233px',
                '80px': '80px',
                '29px': '29px',
                '162px': '162px',
                '122px': '122px',
                '110px': '110px',
                '65px': '65px'
            },
            gap: {
                '50px': '50px'
            },
            borderRadius: {
                '10px': '10px',
                '6px': '6px',
                '8px': '8px',
                '100px': '100px'
            },
            fontSize: {
                '12px': '12px',
                '13px': '13px',
                '16px': '16px',
                '14px': '14px',
                '26px': '26px',
                '15px': '15px',
                '16px': '16px'
            },
            lineHeight: {
                '17px': '17px',
                '31px': '31px',
                '18px': '18px',
                '19px': '19px',
                '15px': '15px',
                '16px': '16px'
            },
            backgroundImage: {
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
            },
            zIndex: {
                '2': '2'
            },
            backdropBlur: {
                '5px': '5px'
            }
        },
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        }
    },
    plugins: []
}