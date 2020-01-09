import Main from '../../common/Main';
import Back from '../../common/back';
import HTTP from '../../common/HttpRequest';
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
        //是不是tab页面
        this.isTabPage = true;
    }

    onStart() {
        this.setBack();
        //获取页面数据
        this.getPageData();
        if (Main.wxGame)
            this.initPage();
    }

    /**初始化页面(加载背景) */
    initPage() {
        let bg=this.owner.getChildByName('bg');
        bg.skin = 'res/img/common/login_bg.jpg';
    }

    setBack() {
        this.isTabPage = this.owner.openedData ? this.owner.openedData.isTabPage : true;
        let backJS = this.owner.shop_back_btn.getComponent(Back);
        if (this.isTabPage) {
            backJS.initBack(1, 'tabPage.scene', { page: Main.pages.page5 });
        } else {
            backJS.initBack();
        }
    }

    getPageData() {
        HTTP.$request({
            that: this,
            url: '/M.Shop/GetShopInfo',
            data: {
                uid: Main.userInfo.userId
            },
            success(res) {
                // console.log(res)
                if (res.data.ret.type == 0) {
                    this.setList(res.data.shopList._v[0].shopTemplates);
                }
            }
        })
    }

    setList(data) {
        let list = this.owner.s_list;
        data.forEach(item => {
            item.icon = 'res/img/shop/2.png';
            item.text = 'res/img/shop/' + item.score + '.png';
            item.btn = 'res/img/shop/' + item.money + '_btn.png';
        });
        list.array = data;
        list.vScrollBarSkin = "";//运用滚动
        list.renderHandler = new Laya.Handler(this, this.listRender)
    }

    listRender(cell, index) {
        let icon = cell.getChildByName('icon');
        let text = cell.getChildByName('text');
        let btn = cell.getChildByName('btn').getChildByName('value');
        icon.skin = cell.dataSource.icon;
        text.skin = cell.dataSource.text;
        btn.skin = cell.dataSource.btn;
        this.bindEvent(btn, cell);
    }

    bindEvent(btn, value) {
        btn.on(Laya.Event.CLICK, this, this.clickBtn, [value])
    }
    clickBtn(cell) {
        Main.showDiaLog('您确认充值' + cell.dataSource.score + '积分?', 1, () => {
            HTTP.$request({
                that: this,
                url: '/M.Shop/PlayerRecharge',
                data: {
                    uid: Main.userInfo.userId,
                    shopId: cell.dataSource.shopId,
                    shopType: 1000
                },
                success(res) {
                    if (res.data.ret.type == 0) {
                        Main.showDiaLog(res.data.ret.msg);
                    }
                }
            })
        })
    }
}