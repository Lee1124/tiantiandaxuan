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
        this.register_btn.on(Laya.Event.CLICK, this, this.comfirmRegisterOrChange);
        this.change_btn.on(Laya.Event.CLICK, this, this.comfirmRegisterOrChange);
    }
    onOpened(options) {
        this._RegisterJS.setPageData(options);
    }

    /**
     * 确认注册/确认修改
     */
    comfirmRegisterOrChange() {
        this._RegisterJS.comfirmRegisterOrChange();
    }
}