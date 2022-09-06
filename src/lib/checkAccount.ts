type Path = "/library" | "/post" | "/account";

const checkAccount = (path: Path): string => {
    const user_id = localStorage.getItem("user_id")

    // ユーザーIDが保存されている場合に通常のパスを返す用にする
    return user_id!=null ? path : "./account/signup"
}

export default checkAccount;