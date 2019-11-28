import Main from '../../common/Main'
export default class paijuhuiguUI extends Laya.Scene {

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
        this._debug=false;
    }

    onEnable() {
        Main.$LOG('牌局回顾场景：',this)
        this.diaLogMask.on(Laya.Event.CLICK,this,this.back)
    }

    back(){
        Laya.Tween.to(this.paijuhuiguBg,{right:-this.paijuhuiguBg.width},150,null,Laya.Handler.create(this,()=>{
            this.removeSelf();
        }))
    }

    onDisable() {
    }

    onOpened(data){
        Main.$LOG('打开牌局回顾场景接受所传的参数:',data);
        this.openData=data;
        this.setUI();
    }
    setUI() {
        let nodeArr=[this.list_bg]
        Main.setNodeTop(nodeArr);
    }
}