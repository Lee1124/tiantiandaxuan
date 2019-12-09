/**
 * 该脚本为打开某场景功能
 */
import Main from '../common/Main';
export default class openView extends Laya.Script {
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
        //打开类型(0：打开后不销毁其他场景 1：打开后销毁当前场景)
        this.openType = 0;
        //打开场景地址
        this.openSceneUrl = '';
        //打开场景时是否销毁其他场景
        this.openCloseOtherScene = false;
        //打开所传参数
        this.openDta = null;
        //打开方式(0：右边划出 1：直接显示)
        this.openMethod = 0;
        //所属场景
        this.selfScene = '';
    }
    /**
     * 打开某场景
     * @param {*} openType 打开类型(0：打开后不销毁其他场景 1：打开后销毁当前场景)
     * @param {*} openSceneUrl 打开场景地址
     * @param {*} openCloseOtherScene 打开场景时是否销毁其他场景
     * @param {*} openDta 打开所传参数
     * @param {*} openMethod 打开方式(0：右边划出 1：直接显示)
     */
    initOpen(openType, openSceneUrl, openCloseOtherScene, openDta, openMethod) {
        this.openType = openType ? openType : 0;
        this.openSceneUrl = openSceneUrl ? openSceneUrl : '';
        this.openCloseOtherScene = openCloseOtherScene ? openCloseOtherScene : false;
        this.openDta = openDta ? openDta : null;
        this.openMethod = openMethod ? openMethod : 0;
    }

    onEnable() {
        this.selfScene = this.owner.scene;
        this.initOpen();
        this.bindEvent();
    }

    bindEvent() {
        this.owner.on(Laya.Event.CLICK, this, this.openView)
    }
    openView() {
        console.log(this.openSceneUrl)
        Main.$openScene(this.openSceneUrl, this.openCloseOtherScene, this.openDta, (res) => {
            if (this.openMethod == 0) {
                res.x = Laya.stage.width;
                res.zOrder = 10;
                Laya.Tween.to(res, { x: 0 }, Main._speed.page, null, Laya.Handler.create(this, () => {
                    if (this.openType == 1)
                        this.selfScene.removeSelf();
                }));
            }
        })
    }
}