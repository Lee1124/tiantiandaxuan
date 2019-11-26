import Main from '../../common/Main';
import LOGIN from './Login';
// import MyCenter from '../../common/MyCenter'

/**
 * 该脚本继承登录页面的场景，为了方便获取UI组件等...
 */
export default class Login extends Laya.Scene {
    constructor() {
        super();
    }
    onAwake() {
        this._LoginJS = this.getComponent(LOGIN);
        this.login_btn.on(Laya.Event.CLICK, this, this.login);
        this.register_btn.on(Laya.Event.CLICK, this, this.register);
        this.change_btn.on(Laya.Event.CLICK, this, this.change);
        this.createLoading();
        Main.getStatusHeight();
        setTimeout(()=>{
            this.ceshi.text=Main.phoneNews.statusHeight+';'+Main.phoneNews.deviceNews
        },500)
    }
    onOpened(options) {
        this.opendNumber = 0;
        this.loginState = options ? options : null;
        if (!this.loginState)
            Main.beforeLoadScene();
    }
    login() {
        this._LoginJS.login();
    }
    register() {
        this._LoginJS.register();
    }
    change() {
        this._LoginJS.changePwd();
    }


    /**
     * 创建加载图标到stage
     */
    createLoading() {
        if (!Laya.stage.getChildByName("resLoading")) {
            let loadingBox = new Laya.Sprite();
            loadingBox.visible = false;
            loadingBox.name = 'resLoading';
            loadingBox.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            let loadingIcon = new Laya.Sprite();
            loadingIcon.name = "icon"
            loadingBox.loadImage('res/img/common/loadBg.png', Laya.Handler.create(this, () => {
                loadingBox.pivot(loadingBox.width / 2, loadingBox.height / 2);
            }));
            loadingIcon.loadImage('res/img/common/loadIcon.png', Laya.Handler.create(this, () => {
                loadingIcon.pivot(loadingIcon.width / 2, loadingIcon.height / 2);
                loadingIcon.pos(loadingIcon.width / 2, loadingIcon.height / 2);
            }));
            loadingBox.addChild(loadingIcon);
            Laya.stage.addChild(loadingBox);
        }
    }
}