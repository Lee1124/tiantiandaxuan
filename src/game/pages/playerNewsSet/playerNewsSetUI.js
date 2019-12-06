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
    }

    bindEvent(){
        this.confrim_btn.on(Laya.Event.CLICK,this,()=>{
            this.playerNewsSetJS.Confrim();
        })
        this.back.on(Laya.Event.CLICK,this,()=>{
            this.playerNewsSetJS.Back();
        })
    }

    setUI() {
        let nodeArr=[this.s_bg1,this.s_bg2];
        Main.setNodeTop(nodeArr);
    }
}