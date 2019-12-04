import Main from '../../common/Main';
import ShopMall from './shopMall';
/**
 * 该脚本继承注册页面的场景，为了方便获取UI组件等...
 */
export default class shopMall extends Laya.Scene{
    constructor(){
        super();
    }
    onAwake(){
        this._ShopMallJS=this.getComponent(ShopMall);
        this.shop_back_btn.on(Laya.Event.CLICK,this,this.back);
    }
    onOpened(options){
        // Main.$LOG('商城界面所收到的值:',options);
        // this._RegisterJS.createNode();
        // this._RegisterJS.setPageData(options);
        this.openedData=options;
    }
    /**
     * 返回登录界面
     */
    back(){
        this._ShopMallJS.back();
    }

    /**
     * 确认注册/确认修改
     */
    comfirmRegisterOrChange(){
        this._RegisterJS.comfirmRegisterOrChange();
    }
}