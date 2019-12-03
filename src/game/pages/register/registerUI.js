import Main from '../../common/Main';
import Register from './register';
/**
 * 该脚本继承注册页面的场景，为了方便获取UI组件等...
 */
export default class register extends Laya.Scene {
    constructor() {
        super();
    }
    onAwake() {
        this._RegisterJS = this.getComponent(Register);
        this.back_btn.on(Laya.Event.CLICK, this, this.back);
        this.register_btn.on(Laya.Event.CLICK, this, this.comfirmRegisterOrChange);
        this.change_btn.on(Laya.Event.CLICK, this, this.comfirmRegisterOrChange);
    }
    onOpened(options) {
        // Main.$LOG('注册或修改密码界面所收到的值:',options);
        // if (options.show) {
        //     this.zOrder = 4;
        //     this._RegisterJS.createNode();
        //     this._RegisterJS.setPageData(options);
        // } else {
        //     this.zOrder = -1;
        // }
        this.zOrder = 4;
        // this._RegisterJS.createNode();
        this._RegisterJS.setPageData(options);
    }
    /**
     * 返回登录界面
     */
    back() {
        this._RegisterJS.back();
    }

    /**
     * 确认注册/确认修改
     */
    comfirmRegisterOrChange() {
        this._RegisterJS.comfirmRegisterOrChange();
    }
}