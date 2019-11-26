export default class SetHeight extends Laya.Script {

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
        this.owner.width=parseInt((this.owner.width/(1242/Laya.stage.width)).toFixed(0));//设置座位适配width
        this.owner.height=parseInt((this.owner.height/(2208/Laya.stage.height)).toFixed(0));//设置座位适配height
    }

    onDisable() {
        
    }
}