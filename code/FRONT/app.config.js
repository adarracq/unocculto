/*module.exports = {
    name: 'Unocculto',
    version: '1.0.0',
    extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
};*/
module.exports = ({ config }) => {
    if (process.env.MY_ENVIRONMENT === 'production') {
        return {
            ...config,
            name: 'unocculto',
            slug: "unocculto",
            version: '1.0.0',
            extra: {
                clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
                apiUrl: process.env.EXPO_PUBLIC_API_URL,
                eas: {
                    projectId: "3b80fff7-5afe-4959-ac76-756ad0b5b014"
                }
            },
        };
    } else {
        return {
            ...config,
            name: 'unocculto',
            slug: "unocculto",
            version: '1.0.0',
            extra: {
                clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
                apiUrl: process.env.EXPO_PUBLIC_API_URL,
                eas: {
                    projectId: "3b80fff7-5afe-4959-ac76-756ad0b5b014"
                }
            },
        };
    }
};