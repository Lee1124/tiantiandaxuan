/**
 * 该脚本是做返回功能
 */
import Main from '../common/Main';
export default class back extends Laya.Script {
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

        //返回类型 （0：表示直接返回,不需要打开场景 1：表示打开场景再返回）
        this.backType = 0;
        //返回场景地址
        this.backScene = '';
        //返回场景所传参数
        this.backData = null;
        //需要移除的html节点
        this.removeNode=null;
    }
    /**
     * 初始化返回参数
     * @param {*} backType 返回类型（0：表示直接返回,不需要打开场景 1：表示打开场景再返回）
     * @param {*} backScene 返回场景地址
     * @param {*} backData 返回场景所传参数
     * @param {*} node 需要移除的节点
     */
    initBack(backType, backScene, backData,node) {
        this.backType = backType?backType:0;
        this.backScene = backScene?backScene:'';
        this.backData = backData?backData:null;
        this.removeNode=node?node:null;
    }
    onEnable() {
        this.initBack();
        this.bindEvent();
    }
    bindEvent() {
        this.owner.on(Laya.Event.CLICK, this, this.back);
    }
    back() {
        //所属场景
        let thisScene = this.owner.scene;
        if (this.backType == 0) {
            Laya.Tween.to(thisScene, { x: Laya.stage.width }, Main._speed.page, null, Laya.Handler.create(this, () => {
                thisScene.removeSelf();
            }))
        } else if (this.backType == 1) {
            Laya.Scene.open(this.backScene, false, this.backData, Laya.Handler.create(this, (res) => {
                Laya.Tween.to(thisScene, { x: Laya.stage.width }, Main._speed.page, null, Laya.Handler.create(this, () => {
                    thisScene.removeSelf();
                }))
            }))
        }
        if(this.removeNode){
            Laya.Browser.document.body.removeChild(this.removeNode)
        }
    }
}