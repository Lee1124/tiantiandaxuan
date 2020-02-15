/**
 * 该脚本是玩家设置信息功能js
 */
import MyClickSelect from '../../Fuction/MyClickSelect';
import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
import Back from '../../common/back';
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
        this.flag = true;
        //所在页面
        this.fromPage = '';
        this.userId = '';
    }

    onStart() {
        if (Main.wxGame)
            this.initPage();
        this.setBack();
        this.setSexList();
        this.sexSelect(0);
        this.setHeadList(0);
        this.headSelect();
        this.setSelectedHead();
        this.fromPage = this.owner.openData.page;
        this.userId = this.owner.openData.userId;
        if (this.fromPage == Main.pages.page5) {
            this.editGetNews();
        }

        /**===测试=== */
        if (Main.AUTO)
            setTimeout(() => {
                this.owner.name_value.text = '用户' + String(new Date().getTime()).slice(6);
                this.Confrim();
            }, 600)
        /**===测试=== */
    }
    /**初始化页面(加载背景) */
    initPage() {
        let bg = this.owner.getChildByName('bg');
        bg.skin = 'res/img/common/login_bg.jpg';
    }
    /**
     * 编辑页面获取个人信息
     */
    editGetNews() {
        HTTP.$request({
            that: this,
            url: '/M.User/GetInfo',
            data: {
                uid: Main.userInfo.userId,
                // tuid: this.userId
            },
            success(res) {
                if (res.data.ret.type == 0)
                    this.setNews(res.data);
            }
        })
    }
    setNews(data) {
        let name = this.owner.name_value;
        this.headId = data.head;
        name.text = data.nick;
        this.sexType = data.sex;
        let sexType = data.sex == 0 ? 1 : 0;
        this.sexSelect(sexType);
        this.setHeadList();
        this.setSelectedHead();
        this.headSelect(parseInt(this.headId) - 1);
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
    sexSelect(type) {
        let selectJS = this.owner.sexList.parent.getComponent(MyClickSelect);
        selectJS.MySelect(this, type, (val) => {
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
            { headUrl: 'res/img/head/4.png', value: 4 },
            { headUrl: 'res/img/head/5.png', value: 5 },
            { headUrl: 'res/img/head/6.png', value: 6 },
            { headUrl: 'res/img/head/7.png', value: 7 },
            { headUrl: 'res/img/head/8.png', value: 8 },
            { headUrl: 'res/img/head/9.png', value: 9 },
            { headUrl: 'res/img/head/10.png', value: 10 },
            { headUrl: 'res/img/head/11.png', value: 11 },
            { headUrl: 'res/img/head/12.png', value: 12 }
        ]
        list.renderHandler = new Laya.Handler(this, this.onRenderHandlerHeadList);
    }

    onRenderHandlerHeadList(cell) {
        let no = cell.getChildByName("listRow").getChildByName("select").getChildByName("no");
        no.skin = cell.dataSource.headUrl;
    }

    headSelect(type) {
        let selectJS = this.owner.headList.parent.getComponent(MyClickSelect);
        selectJS.MySelect(this, type, (val) => {
            this.headId = val;
            this.setSelectedHead();
        })
    }

    setSelectedHead() {
        this.owner.headImg.skin = 'res/img/head/' + this.headId + '.png';
    }

    /**
     * 设置返回参数
     */
    setBack() {
        let backJS = this.owner.back.getComponent(Back);
        if (this.owner.openData.page == Main.pages.page6) {
            backJS.initBack();
        } if (this.owner.openData.page == Main.pages.page5) {
            backJS.initBack(1, 'tabPage.scene', { page: Main.pages.page5 });
        }
    }

    /**
     * 确认
     */
    Confrim() {
        Main.showLoading(true);
        let that = this;
        let url = this.fromPage == Main.pages.page6 ? '/M.User/SetUserInfo' : '/M.User/ModifyUserInfo';
        if (this.flag) {
            this.flag = false;
            let name = this.owner.name_value.text;
            if (name == '' || (name.trim() == '')) {
                Main.showDiaLog('昵称不能为空!');
                this.flag = true;
                Main.showLoading(false);
                return;
            }
            let data = this.fromPage == Main.pages.page6 ? {
                uid: this.owner.openData.userId,
                sex: this.sexType,
                nick: name,
                head: this.headId
            } : {
                    uid: this.owner.openData.userId,
                    sex: this.sexType,
                    nick: name,
                    head: this.headId,
                    signature: ''
                };
            HTTP.$request({
                that: this,
                url: url,
                data: data,
                success(res) {
                    if (res.status) {
                        if (this.fromPage == Main.pages.page6) {
                            Main.showDiaLog('设置成功', 1, () => {
                                that.openNextView();
                            });
                            /**===测试=== */
                            if (Main.AUTO) {
                                setTimeout(() => {
                                    Main.closeDiaLog();
                                    that.openNextView();
                                }, 500)
                            }
                            /**===测试=== */
                        } else if (this.fromPage == Main.pages.page5) {
                            Main.showDiaLog('修改成功', 1, () => {
                                that.openNextView2();
                            });
                        }
                    }
                },
                fail() {
                    this.flag = true;
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

    openNextView2() {
        this.flag = true;
        Main.showLoading(false);
        let backJS = this.owner.back.getComponent(Back);
        backJS.initBack(1, 'tabPage.scene', { page: Main.pages.page5 });
        backJS.back();
    }
}