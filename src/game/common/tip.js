export default class tip extends Laya.Script {

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
        this.flag = true;
        console.log('进来了')
    }

    onDisable() {
    }

    onTriggerEnter(other, self, contact) {
        // other.owner._components[0]._isSensor=true;
        // Laya.Tween.to(other.owner, { y: other.owner.y-200 }, 600)
        // if (this.flag) {
        //     this.flag = false;
        //     console.log('被碰撞了', other)
        //     let length = other.owner.parent._children.length;
        //     other.owner.parent._children.forEach((item, index) => {
        //         if (index < length - 1) {
        //             item.y = -300-(120*(length-index-1));
        //             console.log(item.y)
        //         }
        //     });
        // }
    }
}