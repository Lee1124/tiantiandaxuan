/**
 * 该脚本是玩家设置信息功能js
 */
import MyClickSelect from '../../Fuction/MyClickSelect';
import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
export default class playerNewsSet extends Laya.Script {

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
        //性别(1.男 2.女)
        this.sexType = 1;
        //昵称
        this.name = '';
        //头像Id
        this.headId = 1;
        this.flag=true;
    }

    onStart() {
        this.setSexList();
        this.sexSelect();
        this.setHeadList();
        this.headSelect();
        this.setSelectedHead(this.headId);
    }
    /**
     * 设置性别列表
     */
    setSexList() {
        let list = this.owner.sexList;
        list.array = [
            { icon0: 'res/img/common/set_sex1_0.png', icon1: 'res/img/common/set_sex1_1.png', value: 1 },
            { icon0: 'res/img/common/set_sex0_0.png', icon1: 'res/img/common/set_sex0_1.png', value: 0 }
        ]
        list.renderHandler = new Laya.Handler(this, this.onRenderHandlerSexList);
    }

    onRenderHandlerSexList(cell) {
        let no = cell.getChildByName("listRow").getChildByName("select").getChildByName("no");
        let yes = cell.getChildByName("listRow").getChildByName("select").getChildByName("yes");
        no.loadImage(cell.dataSource.icon0);
        yes.loadImage(cell.dataSource.icon1);
    }

    /**
     * 性别选择
     */
    sexSelect() {
        let selectJS = this.owner.sexList.parent.getComponent(MyClickSelect);
        selectJS.MySelect(this, 0, (val) => {
            this.sexType = val;
        })
    }

    /**
     * 设置头像列表
     */
    setHeadList() {
        let list = this.owner.headList;
        list.vScrollBarSkin = '';
        list.array = [
            { headUrl: 'res/img/head/1.png', value: 1 },
            { headUrl: 'res/img/head/2.png', value: 2 },
            { headUrl: 'res/img/head/3.png', value: 3 },
            { headUrl: 'res/img/head/4.png', value: 4 }
        ]
        list.renderHandler = new Laya.Handler(this, this.onRenderHandlerHeadList);
    }

    onRenderHandlerHeadList(cell) {
        let no = cell.getChildByName("listRow").getChildByName("select").getChildByName("no");
        no.skin = cell.dataSource.headUrl;
    }

    headSelect() {
        let selectJS = this.owner.headList.parent.getComponent(MyClickSelect);
        selectJS.MySelect(this, 0, (val) => {
            this.headId = val;
            this.setSelectedHead(this.headId);
        })
    }

    setSelectedHead(val) {
        this.owner.headImg.skin = 'res/img/head/' + val + '.png';
    }

    /**
     * 返回
     */
    Back() {
        Laya.Tween.to(this.owner, { x: Laya.stage.width }, Main._speed.page, null, Laya.Handler.create(this, () => {
            this.owner.removeSelf();
        }))
    }

    /**
     * 确认
     */
    Confrim() {
        Main.showLoading(true);
        let that = this;
        if(this.flag){
            this.flag=false;
            let name = this.owner.name_value.text;
            if (name == '' || (name.trim() == '')) {
                Main.showDiaLog('昵称不能为空!');
                this.flag=true;
                Main.showLoading(false);
                return;
            }
            let data = {
                userId: this.owner.openData.userId,
                sex: this.sexType,
                nick: name,
                head: this.headId
            };
            HTTP.$request({
                that: this,
                url: '/M.User/SetUserInfo',
                data: data,
                success(res) {
                    if (res.status) {
                        Main.showDiaLog('设置成功', 1, () => {
                            that.openNextView();
                        });
                    }
                },
                fail() {
                    this.flag=true;
                    Main.showLoading(false);
                }
            })
        }
    }

    openNextView() {
        let pageData = {
            roomPws: -1,
            page: Main.pages.page3
        }
        Laya.Scene.open('tabPage.scene', true, pageData, Laya.Handler.create(this, (res) => {
            Main.showLoading(false);
            clearTimeout(this.loadTimeID);
            this.flag = true;
        }), Laya.Handler.create(this, () => {
            this.loadTimeID = setTimeout(() => {
                Main.showLoading(false);
                Main.$LOG('加载超时！');
                clearTimeout(this.loadTimeID);
            }, 10000)
        }))
    }
}