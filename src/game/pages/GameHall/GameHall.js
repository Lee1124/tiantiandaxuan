import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
// import TabPagesUI from '../TabPages/TabPagesUI'
export default class GameHall extends Laya.Script {
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
        this._navType = {//游戏大厅页面类型  全部， 小 ，中， 大
            all: 1,
            small: 2,
            center: 3,
            big: 4
        }
        this._selectNavType = 1;//选中的类型
    }

    onEnable() {
        Main.$LOG('Hall游戏大厅脚本：', this);
        GameHall.instance = this;
    }
    onStart() {
        // Main.$LOG('onStart', this.UI.pageData)

        // this.openGameView();
    }

    openThisPage() {
        if (this.owner.visible) {
            this.UI = this.owner.scene;
            this.registerEvent();
            this.selectThisTab(this.UI.hall_nav_bg._children[1], 1);//默认选择第一项
            if (Main.allowRequesList)
                Laya.timer.loop(60000, this, this.requestPageData, [false]);
        }
    }



    /**
     * 注册点击事件
     */
    registerEvent() {
        this.UI.hall_nav_bg._children.forEach((item, index) => {
            if (index > 0) {
                item.on(Laya.Event.CLICK, this, this.selectThisTab, [item, index])
            }
        });
    }
    /**
     * 重置选中状态
     */
    reloadNavSelectZT() {
        this.UI.hall_nav_bg._children.forEach((item, index) => {
            if (index > 0) {
                item.getChildByName("btn").visible = false;
            }
        });
    }
    /**
     * 选中当前
     * @param {*} itemObj 选中对象
     */
    selectThisTab(itemObj, pageNum) {
        this.reloadNavSelectZT();
        itemObj.getChildByName("btn").visible = true;
        this._selectNavType = pageNum;
        this.requestPageData(true);
    }

    /**
     * 设置全页面的数据
     */
    setPage1Data(data) {
        let page1List = this.UI.gameHall_page1_list;
        page1List.vScrollBarSkin = "";
        page1List.visible = true;
        page1List.array = data;
        page1List.renderHandler = new Laya.Handler(this, this.page1ListOnRender);
        page1List.mouseHandler = new Laya.Handler(this, this.rowOnClick);
    }
    page1ListOnRender(cell, index) {
        let contentBg = cell.getChildByName("content_bg");
        let roomId = contentBg.getChildByName("roomID").getChildByName("value");
        let pi = contentBg.getChildByName("num1").getChildByName("value");
        let online = contentBg.getChildByName("online").getChildByName("value");
        let time = contentBg.getChildByName("time").getChildByName("value");
        let roomLastTime = contentBg.getChildByName("lastTime").getChildByName("value");
        let state_0 = contentBg.getChildByName("state").getChildByName("state_0");
        let state_1 = contentBg.getChildByName("state").getChildByName("state_1");
        let state_2 = contentBg.getChildByName("state").getChildByName("state_2");
        let state_dairu = contentBg.getChildByName("yidairuState");
        roomId.text = cell.dataSource.roomPws;
        pi.text = cell.dataSource.dizhu;
        online.text = cell.dataSource.participate + '/' + cell.dataSource.number;
        if (cell.dataSource.participate == 0) {
            online.color = '#d59b2a';
        } else if (cell.dataSource.participate > 0 && cell.dataSource.participate < cell.dataSource.number) {
            online.color = '#66ce38';
        } else if (cell.dataSource.participate == cell.dataSource.number) {
            online.color = '#FF0000';
        }
        time.text = cell.dataSource.roomTime + '分钟';
        state_0.visible = cell.dataSource.participate == 0 && !cell.dataSource.gameStatus ? true : false;
        state_1.visible = cell.dataSource.participate > 0 && !cell.dataSource.gameStatus ? true : false;
        state_2.visible = cell.dataSource.gameStatus ? true : false;
        state_dairu.visible = cell.dataSource.dairu ? cell.dataSource.dairu : false;
        let roomEndTime = (cell.dataSource.time - Main.getTimeChuo()) < 0 ? 0 : cell.dataSource.time - Main.getTimeChuo();
        roomLastTime.text = Main.secondToDate(roomEndTime);
    }

    rowOnClick(Event, index) {
        Main.$LOG('游戏大厅点击列表0:', Event);
        if (Event.type == 'click') {
            Main.$LOG('游戏大厅点击列表:', Event.target, Event.target.dataSource);
            let data = {
                roomPws: Event.target.dataSource.roomPws,
                page: Main.pages.page3
            }
            Main.showLoading(true,Main.loadingType.three,'正在进入房间...');
            Main.$openScene('cheXuanGame_8.scene', true, data, () => {
                Main.showLoading(false,Main.loadingType.three,'');
            });
        }
    }

    /**
     * 获取页面数据
     * @param isShowLoading 是否显示加载图标
     */
    requestPageData(isShowLoading) {
        if (!Main.allowRequesList)
            Laya.timer.clear(this, this.requestPageData, [false]);
        else {
            if (isShowLoading)
                Main.showLoading(true);
            let data = {
                uid: Main.userInfo.userId
            }
            HTTP.$request({
                that: this,
                url: '/M.Games.CX/GetRoomList',
                data: data,
                success(res) {
                    Main.$LOG('获取大厅列表数据：', res);
                    if (isShowLoading)
                        Main.showLoading(false);
                    if (res.data.ret.type == 0) {
                        this.dealWithResData(res.data.rooms);
                        this.openGameView();
                    } else {
                        Main.showDialog(res.data.ret.msg, 1);
                    }
                },
                fail() {
                    if (isShowLoading)
                        Main.showLoading(false);
                    Main.showDialog('网络异常!', 1);
                }
            })
        }
    }

    /**
  * 是否打开游戏界面
  */
    openGameView() {
        let data = this.UI.pageData;
        if (data.roomPws && data.roomPws > 0) {
            Main.showLoading(true,Main.loadingType.three,'正在进入房间...');
            let pageData = {
                roomPws: data.roomPws,
                page: Main.pages.page3
            }
            Main.$openScene('cheXuanGame_8.scene', true, pageData, () => {
                Main.showLoading(false,Main.loadingType.three,'');
            })
        }
    }

    /**
     * 处理请求回来的数据
     * @param {*} data 返回的数据
     */
    dealWithResData(data) {
        let listData = data;
        // console.log(listData.filter(item=>item.dairu).concat(listData.filter(item=>!item.dairu)))
        let getYESdairudata = listData.filter(item => item.dairu);
        let getNOdairudata = listData.filter(item => !item.dairu);
        let getYESdairudata_pi = getYESdairudata.sort(this.compare('dizhu'));
        let getNOdairudata_pi = getNOdairudata.sort(this.compare('dizhu'));
        let getYESdairudata_pi_youkongwei = getYESdairudata_pi.filter(item => item.participate > 0 && item.participate < item.number);
        let getYESdairudata_pi_yiman = getYESdairudata_pi.filter(item => item.participate == item.number);
        let getYESdairudata_pi_kongfangjian = getYESdairudata_pi.filter(item => item.participate == 0);
        let getYESdairudata_pi_lastData = (getYESdairudata_pi_youkongwei.concat(getYESdairudata_pi_yiman)).concat(getYESdairudata_pi_kongfangjian);
        let getNOdairudata_pi_youkongwei = getNOdairudata_pi.filter(item => item.participate > 0 && item.participate < item.number);
        let getNOdairudata_pi_yiman = getNOdairudata_pi.filter(item => item.participate == item.number);
        let getNOdairudata_pi_kongfangjian = getNOdairudata_pi.filter(item => item.participate == 0);
        let getNOdairudata_pi_lastData = (getNOdairudata_pi_youkongwei.concat(getNOdairudata_pi_yiman)).concat(getNOdairudata_pi_kongfangjian);
        listData = getYESdairudata_pi_lastData.concat(getNOdairudata_pi_lastData);
        // console.log(getYESdairudata_pi_lastData.concat(getNOdairudata_pi_lastData))
        if (this._selectNavType == this._navType.all) { //全部
            listData = listData;
            this.setPage1Data(listData);
        } else if (this._selectNavType == this._navType.small) {//小
            listData = listData.filter(item => item.dizhu == 1 || item.dizhu == 5);
            this.setPage1Data(listData);
        } else if (this._selectNavType == this._navType.center) {//中
            listData = listData.filter(item => item.dizhu == 10 || item.dizhu == 20);
            this.setPage1Data(listData);
        } else if (this._selectNavType == this._navType.big) {//大s
            listData = listData.filter(item => item.dizhu == 50 || item.dizhu == 100);
            this.setPage1Data(listData);
        }
    }

    compare(property, desc = true) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            if (desc == true) {
                // 升序排列
                return value1 - value2;
            } else {
                // 降序排列
                return value2 - value1;
            }
        }
    }
}