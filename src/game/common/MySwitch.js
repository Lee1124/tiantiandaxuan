/**
 * 选择开关功能
 */
export default class MySwitch extends Laya.Script {
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
        //回调函数
        this.callback = null;
        //回调执行函数
        this.callbackThis = null;
        //选择状态(false：关闭 true：打开)
        this.switchState = true;
    }

    onEnable() {
        this.bindEvent();
        this.initSwitch(null, true);
    }
    /**
     * 初始化
     * @param {*} that 执行域
     * @param {*} isSelect 是否选中
     * @param {*} callback 回调函数
     */
    initSwitch(that, isSelect = true, callback) {
        this.callbackThis = that;
        this.callback = callback;
        let yes = this.owner.getChildByName("yes");
        yes.visible = isSelect ? true : false;
    }

    bindEvent() {
        this.owner.on(Laya.Event.CLICK, this, this.clickSwitch)
    }

    clickSwitch() {
        let yes = this.owner.getChildByName("yes");
        yes.visible = !yes.visible;
        this.switchState = yes.visible;
        if (this.callback)
            this.callback.call(this.callbackThis, this.switchState)
    }
}