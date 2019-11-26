export default class paijutishiUI extends Laya.Scene {

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
        this._debug = false;
    }

    $LOG(...data) {
        if (this._debug)
            console.log(...data)
    }

    onEnable() {
        this.$LOG('实时战绩厂场景：', this)
        this.diaLogMask.on(Laya.Event.CLICK, this, this.back)
    }

    back() {
        Laya.Tween.to(this.paijutishiBg, { x: -Laya.stage.width }, 150, null, Laya.Handler.create(this, () => {
            this.removeSelf();
        }))
    }

    onDisable() {
    }

    onOpened(data) {
        this.openData = data;
        if (!data.show) {
            this.x = -Laya.stage.width;
        }
    }
}