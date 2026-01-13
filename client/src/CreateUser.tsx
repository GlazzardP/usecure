// import { gql, useMutation } from '@apollo/client'
// import { useRef } from 'react'

// const CREATE_USER = gql`
//   mutation createUser(firstName: String!, $lastName: String!, $email: String!) {
//     createUser(firstName: $firstName, lastName: $lastName, email: $email) {
//       id
//       firstName
//       lastName
//       email
//     }
//   }
// `

// /*
//   This isn't used anywhere but is set up to show you how using mutations work on the client.
//  */
// export const CreateUser = () => {
//   const firstNameRef = useRef<HTMLInputElement>(null)
//   const lastNameRef = useRef<HTMLInputElement>(null)
//   const emailRef = useRef<HTMLInputElement>(null)
//   const [createUser] = useMutation(CREATE_USER)

//   return (
//     <div>
//       <form onSubmit={e => {
//         e.preventDefault()
//         createUser({ variables: { 
//           firstName: firstNameRef.current?.value || '', 
//           lastName: lastNameRef.current?.value || '', 
//           email: emailRef.current?.value || '' 
//         } })
//         if (firstNameRef.current) firstNameRef.current.value = ''
//         if (lastNameRef.current) lastNameRef.current.value = ''
//         if (emailRef.current) emailRef.current.value = ''
//       }}>
//         <input ref={firstNameRef} placeholder='First Name'/>
//         <input ref={lastNameRef} placeholder='Last Name'/>
//         <input ref={emailRef} placeholder='Email' type='email'/>
//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   )
// }
