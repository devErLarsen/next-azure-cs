import NextAuth from "next-auth"
import AzureADProvider from 'next-auth/providers/azure-ad'

export default NextAuth({
    // Configure one or more authentication providers  
    providers: [  
        AzureADProvider({    
            clientId: process.env.AZURE_AD_CLIENT_ID,    
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,


            // authorization: {
            //     url: 'https://login.microsoftonline.com/common/oauth2/authorize',
            //     params: {
            //         scope: 'email offline_access openid profile User.Read'
            //     }
            // },

            // profile(profile) {
            //     return {
            //         id: profile.sub,
            //         ...profile,
            //     };
            // },
        }),

        
    ]
    // providers: [
    //     {
    //       id: 'azure-ad',
    //       name: 'Azure Active Directory',
    //       type: 'oauth',
    //       authorization: {
    //         url: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_mode=query`,
    //         params: {
    //           audience: process.env.AZURE_AD_CLIENT_ID,
    //           scope:
    //             'offline_access openid User.Read email profile',
    //         },
    //       },
    //       token: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
    //       wellKnown: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
    //       profile(profile) {
    //         return {
    //           id: profile.sub,
    //           ...profile,
    //         };
    //       },
    //       options: {
    //         clientId: process.env.AZURE_AD_CLIENT_ID,
    //         clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    //       },
    //     },
    //   ],
})