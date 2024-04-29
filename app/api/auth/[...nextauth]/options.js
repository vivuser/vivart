import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
const options = ({

    providers: [
        GithubProvider({        
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider(
            {
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                console.log('trying to log', credentials)

                
                const res = await fetch("http://localhost:3001/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                console.log(res, 'response..')
                const user = await res.json()
                console.log(user,' ====>')
                if (res.ok && user) {
                    console.log('returning')
                    return user
                }
                // return null
            }
        })

    ],
    callbacks: {
        async jwt({ token, user, session }) {
            console.log("jwt callback", { token, user, session })
            if (user) {
                return {
                ...token,
                id: user.userId,
                topics: [user?.topics]
             }
            }
            return token;
        },
            async session ( {session, token, user }) {
                console.log("session callback", { session, token, user });
                let topics = [];
                if (token && token.topics && Array.isArray(token.topics[0])) {
                    topics = token.topics[0];
                }
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id,
                        topics: topics
                    }
                }
                return session;
            }
    }

})

export default options;



