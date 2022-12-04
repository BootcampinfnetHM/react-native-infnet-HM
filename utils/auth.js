const userIsLoggedIn = async () => {
    return true
}

const authLogin = async (emailText, passwordTexts) => {
    console.log('Login')
}

const authRegister = async (emailText, passwordTexts) => {
    console.log('Registro')
}

const authLogout = async (emailText, passwordTexts) => {
    console.log('Logout')
}

export {
    userIsLoggedIn,
    authLogin,
    authRegister,
    authLogout,
}