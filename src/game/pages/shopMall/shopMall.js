import Main from '../../common/Main';
export default class shopMall extends Laya.Script {

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

    onDisable() {
    }
    back() {
        if (this.owner.openedData.isTabPage) {
            this.signoutthisPage('tabPage.scene', Main.pages.page5);
        } else {
            Laya.Tween.to(this.owner, { x: Laya.stage.width }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }))
        }
    }
    /**
     * 打开界面
     * @param {*} openSceneUrl 打开场景
     * @param {*} openView 打开界面
     */
    signoutthisPage(openSceneUrl, openView) {
        Laya.Scene.open(openSceneUrl, false, { page: openView }, Laya.Handler.create(this, (res) => {
            Laya.Tween.to(this.owner, { x: Laya.stage.width }, Main._speed.page, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf();
            }))
        }))
    }
}