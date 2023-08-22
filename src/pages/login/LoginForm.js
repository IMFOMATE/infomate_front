import "./login.css"

function LoginForm() {

    return (
        <div class="wrapper">
            <div class="alignForm">
                <h2 class="loginTitle">INFOMATE</h2>

                <form action="/login" method="post">
                    <div>
                        <input class="input1" type="text" id="username" name="username" required placeholder="사번" />
                    </div>
                    <div>
                        <input class="input1" type="password" id="password" name="password" required placeholder="비밀번호" />
                    </div>
                    <div>
                        <input class="btn1" type="button" value="로그인" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;