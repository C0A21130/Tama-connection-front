type Path = "/library" | "/post" | "/account";

const checkAccount = () => {
    const token = localStorage.getItem("token")
    // ユーザーIDが保存されている場合に通常のパスを返す用にする
    return token!=null
}

export default checkAccount;