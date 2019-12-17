import Main from '../../common/Main';
export default class shishizhanjiUI extends Laya.Scene {

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
    onEnable() {
        Main.$LOG('实时战绩厂场景：', this)
        this.diaLogMask.on(Laya.Event.CLICK, this, this.back);
    }

    back() {
        Laya.Tween.to(this.shishizhanjiBg, { x: -Laya.stage.width }, 150, null, Laya.Handler.create(this, () => {
            this.removeSelf();
        }))
    }

    onDisable() {
    }

    onOpened(data) {
        Main.$LOG('打开实时战绩场景接受所传的参数:', data);
        this.openData = data;
        this.setUI();
    }

    setUI() {
        let nodeArr=[this.s_hd,this.s_bg1,this.s_bg3]
        Main.setNodeTop(nodeArr);
    }
}