import { useForm } from "react-hook-form";
import './App.css'

function App() {

  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm();

  // const delay = (d) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, d * 1000);
  //   })
  // }

    const onSubmit = async (data) => {
      // await delay(2)
      let r = await fetch('http://localhost:3000/', {method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)}) 
      let res = await r.text();
      
      console.log(data, res)

      if(data.username !== 'Shivi') {
        setError('invalid', {message: 'Invalid credentials'})
      }

      if (data.username === 'Jugnu') {
        setError('blocked', {message: 'This user is blocked'})
      }
    }
    

  return (
    <>
    {isSubmitting && <div>Loading...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" type="text" {...register("username", {required: {value: true, message: 'This field is required'}, minLength: {value: 3, message: 'min length is 3'}, maxLength: {value: 8, message: 'max length is 8'}})}/>
        {errors.username && <span>{errors.username.message}</span>}
        <br />
        <input placeholder="password" type="password" {...register("password", {required: {value: true, message: 'This field is required'}, minLength: {value: 3, message: 'min length is 3'}, maxLength: {value: 8, message: 'max length is 8'}})}/>
        {errors.password && <span>{errors.password.message}</span>}
        <br />
        <input disabled={isSubmitting} type="submit" />
        <br />
        {errors.invalid && <span>{errors.invalid.message}</span>}
        <br />
        {errors.blocked && <span>{errors.blocked.message}</span>}
      </form>
    </>
  )
}

export default App
