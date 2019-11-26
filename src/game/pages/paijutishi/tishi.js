import Main from '../../common/Main';
export default class zhanji extends Laya.Script {

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
    }
    onStart() {
        if (this.owner.openData.show)
            this.setPersonListRowNum();
        Main.$LOG('组件信息：', this);
    }

    onDisable() {
    }

    setPersonListRowNum() {
        let paijutishiBg = this.owner.getChildByName("paijutishiBg")
        paijutishiBg.x = -Laya.stage.width;
        this.owner.diaLogMask.visible=true;
        Laya.Tween.to(paijutishiBg, { x: 0 }, 150);
    }
}