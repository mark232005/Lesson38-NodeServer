

export function LoginSignup() {
    return (
        <section className='login-page'>
            <form className='login-form' onSubmit={handelSubmit}>
             <input
              type="text"
               name='username' 
               onChange={handelChange}
               palceHolder='Username'
             />
             <input type="text" />
            </form>
        </section>
    )
}