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
                email: {
                    label: "Email: ",
                    type: "text",
                    placeholder: "your-user-name"
                },
                password: {
                    label: "Password: ",
                    type: "password",
                    placeholder: "your-password"
                }
            }
            ,
            
            async authorize(credentials) {
                console.log('trying to log', credentials)
                const res = await fetch("http://localhost:3001/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                console.log(res, 'response..')
                const user = await res.json()

                if (res.ok && user) {
                    return user
                }
                return null
            }
        })

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token
            }
            return token
        },
        async signIn(user) {
            await createUserInDatabase(user);
            return true;
        },
        async createUser(user) {
            await createUserInDatabase(user);
            return user;
        }
        
    }

})

export default options;



