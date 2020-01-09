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
        // this.register_btn.on(Laya.Event.CLICK, this, this.register);
        // this.change_btn.on(Laya.Event.CLICK, this, this.change);
    }
    onOpened(options) {
        this.opendNumber = 0;
        this.loginState = options ? options : null;
        // if (!this.loginState)
        //     // Main.beforeLoadScene();

        // if (!this.loginState) {
        //     // Main.createLoading(Main.loadingType.one);//预创建HTTP请求加载中的资源
        //     // Main.createLoading(Main.loadingType.two);//预创建断线重连加载中的资源
        //     // Main.createLoading(Main.loadingType.three);//预创建带文字加载中的资源
        //     // Main.createTipBox();
        //     // Main.getStatusHeight();
        //     // Main.createDiaLog();
        // }
        // this.initPage();
    }
    login() {
        this._LoginJS.login();
    }
    // register() {
    //     // this._LoginJS.register();
    // }
    // change() {
    //     this._LoginJS.changePwd();
    // }

    
}