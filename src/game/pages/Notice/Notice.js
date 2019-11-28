import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest'
export default class Notice extends Laya.Script {
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
        this._page = {
            page1: 'systemNotice',
            page2: 'myNews'
        }
    }

    onEnable() {
        Main.$LOG('Notice脚本：', this);
        Notice.instance=this;
    }
    openThisPage() {
        if (this.owner.visible) {
            this.UI = this.owner.scene;
            this.openSelectView(this._page.page2);
            this.registerEvent();
            this.openSystemList();
        }
    }

    onDisable() {
    }
    registerEvent() {
        this.UI.systemNotice_box.on(Laya.Event.CLICK, this, this.openSelectView, [this._page.page1]);
        this.UI.myNews_box.on(Laya.Event.CLICK, this, this.openSelectView, [this._page.page2]);
    }
    reloadSelectZt() {
        this.UI.systemNotice.visible = false;
        this.UI.myNews.visible = false;
    }
    openSelectView(page) {
        this.reloadSelectZt();
        this.UI[page].visible = true;
    }

    openSystemList() {
        this.systemList=this.UI.sysytem_list;
        this.systemList.vScrollBarSkin = "";//运用滚动
        this.systemList.array = [
            {
                imgUrl: 'res/img/Notice/notice1.png'
            },
            {
                imgUrl: 'res/img/Notice/notice2.png'
            }
        ];
        this.systemList.renderHandler = new Laya.Handler(this, this.systemListOnRender);
    }

    systemListOnRender(cell,index){
        let systemContent=cell.getChildByName("sysytem_content");
        systemContent.skin=cell.dataSource.imgUrl;
    }
}