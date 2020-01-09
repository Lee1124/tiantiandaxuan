/**
 * 联系客服
 */
import Main from '../../common/Main';
import Back from '../../common/back';
export default class service extends Laya.Script {
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
        //联系客服跳转地址
        this.serviceUrl = '';
    }

    onEnable() {
        this.setUI();
        this.setPageData();
    }
    onStart() {
        this.initBack();
        if (Main.wxGame)
            this.initPage();
    }
    /**初始化页面(加载背景) */
    initPage() {
        let bg=this.owner.getChildByName('bg');
        bg.skin = 'res/img/common/login_bg.jpg';
    }
    initBack() {
        let BackJS = this.owner.back.getComponent(Back);
        BackJS.initBack(null, null, null, this.iframe);
    }
    setPageData() {
        this.serviceUrl = Main.serviceUrl;
        this.iframe = this.createIframeElement();
        this.iframe.src = this.serviceUrl;
        this.iframe.id = 'myIframe';
        Laya.Utils.fitDOMElementInArea(this.iframe, this.owner.contentView, this.owner.x, 0, this.owner.contentView.width, this.owner.contentView.height);
    }

    createIframeElement() {
        let iframe = Laya.Browser.createElement("iframe");
        iframe.style.zIndex = Laya.Render.canvas.zIndex + 1;
        Laya.Browser.document.body.appendChild(iframe);
        return iframe;
    }

    setUI() {
        let nodeArr = [this.owner.contentView];
        Main.setNodeTop(nodeArr);
    }
}