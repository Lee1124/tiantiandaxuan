import HTTP from '../../common/HttpRequest';
import Main from '../../common/Main';
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

    setPageData(options){
        this._pageType=options.page;
        if(options.page==Main.sign.register){
            this.owner.title_1.visible=true;
            this.owner.title_2.visible=false;
            this.owner.register_btn.visible=true;
            this.owner.change_btn.visible=false;
        }else if(options.page==Main.sign.changePwd){
            this.owner.title_1.visible=false;
            this.owner.title_2.visible=true;
            this.owner.register_btn.visible=false;
            this.owner.change_btn.visible=true;
        }
    }

    onEnable() {
    }
    onStart() {
        setTimeout(() => {
            this.showHideNode(true);
        }, Main._speed.page)
    }
    createInputElement() {
        let input = Laya.Browser.createElement("input");
        input.style.zIndex = Laya.Render.canvas.zIndex + 1;
        input.autocomplete='off';
        Laya.Browser.document.body.appendChild(input);
        return input;
    }
    comfirmRegisterOrChange() {
        let that=this;
        let user = this.userInput.value;
        let pwd = this.pwdInput.value;
        let code = this.codeInput.value;
        if (user == "") {
            Main.showDialog('手机号不能为空！!',1,[this.codeInput],null);
            return
        } else if (pwd == "") {
            Main.showDialog('密码不能为空!',1,[this.codeInput]);
            return
        } else if (code == "") {
            Main.showDialog('验证码不能为空!',1,[this.codeInput]);
            return
        }
        let data = {
            name: user,
            pws: pwd,
            code: code
        }
        if(this._pageType==3){
            data = {
                name: user,
                now: pwd,
                code: code
            }
        }
        let url = this._pageType==2?"/M.Acc/Register":"/M.Acc/ModifyPws";
        HTTP.$request({
            that: this,
            url: url,
            data: data,
            success(res) {
                // console.log(res)
                if (res.data.ret.type == 0) {
                    let data = {
                        user: user,
                        pwd: pwd,
                    }
                    localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
                    if(this._pageType==2){
                        Main.showDialog('注册成功,返回登录',1,[this.codeInput],()=>{
                            that.back();
                        },null,null,false);
                    }else{
                        Main.showDialog('修改成功',1,[this.codeInput]);
                    }
                } else {
                    Main.showDialog(res.data.ret.msg,1,[this.codeInput]);
                }
            },
            fail(){
                Main.showDialog('网络异常!',1,[this.codeInput]);
            }
        })
    }

    createNode() {
        this.userInput = this.createInputElement();
        this.pwdInput = this.createInputElement();
        this.codeInput = this.createInputElement();
        this.userInput.id = 'register_user';
        this.pwdInput.id = 'register_pwd';
        this.codeInput.id = 'register_code';
        this.userInput.placeholder = '请输入手机号';
        this.pwdInput.placeholder = '6-12个字符';
        this.codeInput.placeholder = '请输入验证码';
        this.pwdInput.type = "password";
        Laya.Utils.fitDOMElementInArea(this.userInput, this.owner.user_input_box, 0, 0, this.owner.user_input_box.width, this.owner.user_input_box.height);
        Laya.Utils.fitDOMElementInArea(this.pwdInput, this.owner.pwd_input_box, 0, 0, this.owner.pwd_input_box.width, this.owner.pwd_input_box.height);
        Laya.Utils.fitDOMElementInArea(this.codeInput, this.owner.code_input_box, 0, 0, this.owner.code_input_box.width, this.owner.code_input_box.height);
        this.showHideNode(false);
    }

    /**
     * 显示或隐藏input 节点
     * @param {*} show 
     */
    showHideNode(show) {
        if (this.userInput && this.pwdInput && this.codeInput) {
            this.userInput.style.display = show ? 'block' : 'none';
            this.pwdInput.style.display = show ? 'block' : 'none';
            this.codeInput.style.display = show ? 'block' : 'none';
            if(!show){
                this.userInput.disabled='disabled';
                this.pwdInput.disabled='disabled';
                this.codeInput.disabled='disabled';
            }else{
                this.userInput.removeAttribute("disabled");
                this.pwdInput.removeAttribute("disabled");
                this.codeInput.removeAttribute("disabled");
            }
        }
    }

    back() {
        Laya.Scene.open('login.scene', false, Main.sign.signOut, Laya.Handler.create(this, (res) => {
            this.showHideNode(false);
            Laya.Tween.to(this.owner, { x: Laya.stage.width }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }))
        }))
    }

    onDisable() {
    }

    onLoaded() {

    }
}