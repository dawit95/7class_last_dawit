<script>
import axios from "axios";
const storage = window.sessionStorage;

const ai = axios.create({
    //==============================================================
    baseURL: "http://localhost:9999/api/"
});

export default {
    data() {
        return {
            id:'',
            password:'',
            message:'로그인해주세요.',
            status:'',
            token:'',
            info:''
        };
    },
    methods: {
        setInfo(status, token, info) {
            this.status = status;
            this.token = token;
            this.info = info;
        },
        logout() {
            storage.setItem("jst-auth-token", "");
            storage.setItem("login_user", "");
            this.message = "로그인해주세요.";
            this.setInfo("로그아웃 성공", "", "");
        }
        getInfo() {
            ai.post(
                "/info",
                {
                    id: "commonID",
                    password: "some password"
                },
                {
                    headers: {
                        "jwt-auth-token":storage.getItem("jwt-auth-token")
                    }
                }
            )
            .then(res => {
                this.setInfo(
                    "정보 조회 성송",
                    res.headers.auth_token,
                    JSON.stringify(res.data)
                );
            })
            .catch(e => {
                this.setInfo("정보 조회 실패", "", e.response.data.msg);
            });
        },
        login() {
            storage.setItem("jwt-auth-token", "");
            storage.setItem("login_user", "");
            ai.post("/user/signin", {
                id: this.id,
                password = this.password
            })
            .then(res => {
                if(res.data.status) {
                    this.message = res.data.data.id + "로 로그인 되었습니다.";
                    console.dir(res.headers["jst-auth-token"]);
                    this.setInfo(
                        "성공",
                        res.headers["jwt-auth-token"],
                        JSON.stringify(res.data.data)
                    );
                    storage.setItem("jwt-auth-token", res.headers["jwt-auth-token"]);
                    storage.setItem("login_user", res.data.data.id);
                }else {
                    this.setInfo("", "", "");
                    this.message = "로그인해주세요.";
                    alert("입력 정보를 확인하세요.");
                }
            })
            .catch(e => {
                this.setInfo("실패", "", JSON.stringify(e.response || e.message ));
            });
        },
        init() {
            if(storage.getItem("jwt-auth-token")) {
                this.message = storage.getItem("login_user")+"로 로그인 되었습니다.";
            } else {
                storage.setItem("jwt-auth-token", "");
            }
        }
    },
    mounted() {
        this.init();
    }
};
</script>