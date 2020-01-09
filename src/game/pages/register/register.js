import HTTP from '../../common/HttpRequest';
import Main from '../../common/Main';
import Back from '../../common/back';
export default class register extends Laya.Script {
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
    }

    setPageData(options) {
        this._pageType = options.page;
        if (options.page == Main.sign.register) {
            this.owner.title_1.visible = true;
            this.owner.title_2.visible = false;
            this.owner.register_btn.visible = true;
            this.owner.change_btn.visible = false;
        } else if (options.page == Main.sign.changePwd) {
            this.owner.title_1.visible = false;
            this.owner.title_2.visible = true;
            this.owner.register_btn.visible = false;
            this.owner.change_btn.visible = true;
        }
    }
    onEnable() {
    }
    onStart() {
        this.initBack();
        //微信小游戏背景图
        if (Main.wxGame)
            this.initPage();
    }
    /**初始化页面(加载背景) */
    initPage() {
        let bg=this.owner.getChildByName('bg');
        bg.skin = 'res/img/common/login_bg.jpg';
    }
    comfirmRegisterOrChange() {
        let that = this;
        let user = this.owner.phone_value.text;
        let pwd = this.owner.pwd_value.text;
        let code = this.owner.code_value.text;
        Main.showLoading(true);
        if (user == "") {
            this.flag = true;
            Main.showLoading(false);
            Main.showDiaLog('手机号不能为空！!');
            return
        } else if (pwd == "") {
            this.flag = true;
            Main.showLoading(false);
            Main.showDiaLog('密码不能为空!');
            return
        } else if (code == "") {
            this.flag = true;
            Main.showLoading(false);
            Main.showDiaLog('验证码不能为空!');
            return
        }
        let data = {
            name: user,
            pws: pwd,
            code: code
        }
        if (this._pageType == 3) {
            data = {
                name: user,
                now: pwd,
                code: code
            }
        }
        let url = this._pageType == 2 ? "/M.Acc/Register" : "/M.Acc/ModifyPws";
        HTTP.$request({
            that: this,
            url: url,
            data: data,
            success(res) {
                // console.log(res)
                if (res.data.ret.type == 0) {
                    this.flag = true;
                    Main.showLoading(false);
                    let data = {
                        user: user,
                        pwd: pwd,
                    }
                    if (Main.wxGame) {
                        wx.setStorageSync('userInfo', data);
                    } else {
                        localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
                    }
                    // localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
                    if (this._pageType == 2) {
                        Main.showDiaLog('注册成功,返回登录', 1, () => {
                            that.back();
                        }, null, null, false);
                    } else {
                        Main.showDiaLog('修改成功');
                    }
                } else {
                    this.flag = true;
                    Main.showLoading(false);
                    Main.showDiaLog(res.data.ret.msg);
                }
            },
            fail() {
                this.flag = true;
                Main.showLoading(false);
            },
            timeout() {
                this.flag = true;
            }
        })
    }
    //初始化返回
    initBack() {
        let backJS = this.owner.back_btn.getComponent(Back);
        backJS.initBack(1, 'login.scene', Main.sign.signOut);
        return backJS;
    }
    //返回等登录页
    back() {
        let backJS = this.initBack();
        backJS.back();
    }
}