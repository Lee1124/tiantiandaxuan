/**
 * 该脚本是玩家设置信息功能js
 */
import PlayerNewsSet from './playerNewsSet';
import Main from '../../common/Main';
export default class playerNewsSet extends Laya.Scene {
    constructor() { 
        super(); 
    }
    onAwake(){
        this.playerNewsSetJS=this.getComponent(PlayerNewsSet);
        this.bindEvent();
    }
    onOpened(options) {
        this.openData=options;
        this.setUI();
    }

    bindEvent(){
        this.confrim_btn.on(Laya.Event.CLICK,this,()=>{
            this.playerNewsSetJS.Confrim();
        })
    }

    setUI() {
        let nodeArr=[this.set_bg1,this.set_bg2];
        Main.setNodeTop(nodeArr);
    }
}