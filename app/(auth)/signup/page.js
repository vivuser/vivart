import { SignUpForm } from "../authComponents/SignUpForm";

const Signup = () => {

    async function registerUser(formData) {
        'use server'

        const formFields = {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword : formData.get('confirmPassword')
        }
        console.log(formFields , 'checking  formfields..')

        try{
            const response = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formFields)
            });

            if (response.ok) {
                console.log('registered successfully')
            }else
                {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error)
        }

    }


    return (<>
        <SignUpForm />
        {/* <div className="flex flex-col mx-auto max-w-lg bg-gray-200 m-20">
        <h2 className="text-lg font-normal mx-auto pt-2">Register</h2>
        <form action={registerUser} className="flex flex-col p-4">
        <input  name="email" placeholder="email" className="p-2 border-t-1 m-1 w-full"/>
        <input  name="password" placeholder="password" className="p-2 border-t-1 m-1 w-full"/>
        <input  name="confirmPassword" placeholder="confirm password" className="p-2 border-t-1 m-1 w-full"/>
        <button type="submit" className="bg-violet-300 shadow-md p-2 rounded-md w-full m-1">Submit</button>
        </form>
        </div> */}
  </>  )
}

export default Signup;  