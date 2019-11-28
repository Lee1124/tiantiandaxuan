import HTTP from '../../common/HttpRequest';
import Main from '../../common/Main';
export default class login extends Laya.Script {
    constructor() {
        super();
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        this.flag=true;
    }

    onEnable() {
    }

    onStart() {
        this.startLoadPage();
    }

    /**
     * 等待加载图标创建完毕后再加载页面
     */
    startLoadPage() {
        let phone = document.getElementById('phone');
        let pwd = document.getElementById('pwd');
        if (phone && pwd) {
            setTimeout(() => {
                this.showHideNode(true);
            }, Main._speed.page);
            this.textInput = phone;
            this.passwordInput = pwd;
            this.setValue();
        } else {
            this.textInput = this.createInputElement();
            this.passwordInput = this.createInputElement();
            this.textInput.id = 'phone';
            this.passwordInput.id = 'pwd';
            this.textInput.placeholder = '请您输入账号';
            this.passwordInput.placeholder = '请您输入密码';
            this.passwordInput.type = "password";
            Laya.Utils.fitDOMElementInArea(this.textInput, this.owner.phone, 0, 0, this.owner.phone.width, this.owner.phone.height);
            Laya.Utils.fitDOMElementInArea(this.passwordInput, this.owner.pwd, 0, 0, this.owner.pwd, this.owner.pwd.height);
            this.setValue();
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo) {
                if (userInfo.user && userInfo.pwd && !this.owner.loginState)
                    this.login();
            }
        }
    }

    setValue() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            this.textInput.value = userInfo.user ? userInfo.user : '';
            this.passwordInput.value = userInfo.pwd ? userInfo.pwd : '';
        }
    }

    createInputElement() {
        let input = Laya.Browser.createElement("input");
        input.style.zIndex = Laya.Render.canvas.zIndex + 1;
        input.autocomplete = 'off';
        Laya.Browser.document.body.appendChild(input);
        return input;
    }

    /**
    * 显示或隐藏input 节点
    * @param {*} show 
    */
    showHideNode(show) {
        if (this.textInput && this.passwordInput) {
            this.textInput.style.display = show ? 'block' : 'none';
            this.passwordInput.style.display = show ? 'block' : 'none';
            if (!show) {
                this.textInput.disabled = 'disabled';
                this.passwordInput.disabled = 'disabled';
            } else {
                this.textInput.removeAttribute("disabled");
                this.passwordInput.removeAttribute("disabled");
            }
        }
    }

    login() {
        // this.owner.ceshi.text='开始请求！';
        if(this.flag){
            this.flag=false;
            Main.showLoading(true);
            let user = this.textInput.value;
            let pwd = this.passwordInput.value;
            if (user == '') {
                this.flag=true;
                Main.showDialog('账号不能为空!', 1, [this.textInput, this.passwordInput]);
                Main.showLoading(false);
                return false;
            } else if (pwd == '') {
                this.flag=true;
                Main.showDialog('密码不能为空!', 1, [this.textInput, this.passwordInput]);
                Main.showLoading(false);
                return false;
            }
            let jsonObj = {
                pws: pwd
            }
            jsonObj = escape(JSON.stringify(jsonObj))
            let data = {
                acc: user,
                ip: '192.168.0.112',
                type: 'accpws',//accpws账号密码  phone手机 wechat微信 weibo微博
                json: jsonObj,
                devid: 1234
            }
            HTTP.$request({
                that: this,
                url: '/M.Acc/Login',
                data: data,
                success(res) {
                    
                    // this.owner.ceshi.text='请求成功！';
                    //    console.log(res.data)
                    if (res.data.ret.type == 0) {
                        let data = {
                            user: user,
                            pwd: pwd,
                            userId: res.data.userId,
                            key: res.data.key,
                            inRoomPws: res.data.inRoomPws
                        }
                        this.changeMainUserInfo(data);
                        this.dealWithLoginedView(data);
                    } else {
                        this.flag=true;
                        Main.showLoading(false);
                        Main.showDialog(res.data.ret.msg, 1, [this.textInput, this.passwordInput]);
                    }
                },
                fail() {
                    this.flag=true;
                    Main.showLoading(false);
                    this.showHideNode(false);
                    Main.showDialog('网络异常!', 1, [this.textInput, this.passwordInput]);
                }
            })
        }
    }

    /**
     * 登录后将公用的个人信息更新
     */
    changeMainUserInfo(data) {
        localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
        Main.userInfo = data;
    }
    /**
     * 处理登录结果(1.主界面 2.游戏界面)
     */
    dealWithLoginedView(data) {
        let pageData = {
            roomPws: data.inRoomPws,
            page: Main.pages.page3
        }
        Laya.Scene.open('tabPage.scene', true, pageData, Laya.Handler.create(this, (res) => {
            Main.showLoading(false);
            this.showHideNode(false);
            clearTimeout(this.loadTimeID);
            this.flag=true;
        }),Laya.Handler.create(this,()=>{
            this.loadTimeID=setTimeout(()=>{
                Main.showLoading(false);
                Main.$LOG('加载超时！');
                clearTimeout(this.loadTimeID);
            },10000)
        }))
    }

    /**
     * 注册
     */
    register() {
        Main.$openScene('register.scene', false, { page: Main.sign.register }, (res) => {
            res.x = Laya.stage.width;
            this.showHideNode(false);
            Laya.Tween.to(res, { x: 0 }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }));
        })
    }

    /**
     * 修改密码
     */
    changePwd() {
        Main.$openScene('register.scene', false, { page: Main.sign.changePwd }, (res) => {
            res.x = Laya.stage.width;
            this.showHideNode(false);
            Laya.Tween.to(res, { x: 0 }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }));
        })
    }

    onDisable() {
    }

    onLoaded() {

    }
}