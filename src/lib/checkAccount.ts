type Path = "/library" | "/post" | "/account";

const checkAccount = (path: Path): string => {
    return false ? path : "./account/signup"
}

export default checkAccount;