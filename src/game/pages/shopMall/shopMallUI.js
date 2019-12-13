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
        
    }
    onOpened(options){
        this.openedData=options;
        this.setUI();
    }

    setUI() {
        let nodeArr = [this.shop_hd,this.shop_content]
        Main.setNodeTop(nodeArr);
    }
}