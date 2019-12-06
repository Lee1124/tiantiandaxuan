import Main from '../../common/Main';
import HTTP from '../../common/HttpRequest';
export default class Data extends Laya.Script {
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
        Main.$LOG('Data牌局数据脚本：', this);
        Data.instance = this;
    }

    openThisPage() {
        if (this.owner.visible) {
            this.UI = this.owner.scene;
            // // this.requestPageData();
            this.requestPageData();
        }
    }
    /**
     * 设置全页面的数据
     */
    setPageListData(data) {
        let pageList = this.UI.paiju_data_list;
        pageList.visible=true;
        pageList.vScrollBarSkin = "";
        pageList.array = data;
        pageList.renderHandler = new Laya.Handler(this, this.pageListOnRender);
    }
    pageListOnRender(cell, index) {
        // console.log(cell, index)
        let timeIcon = cell.getChildByName("timeIcon");
        let timeBox = cell.getChildByName("timeBox");
        let month = timeBox.getChildByName("month");
        let day = timeBox.getChildByName("day");
        timeIcon.visible = cell.dataSource.showTime;
        timeBox.visible = cell.dataSource.showTime;
        month.text = cell.dataSource.month;
        day.text = cell.dataSource.day;
        let listBg = cell.getChildByName("list_bg");
        // let headNode = listBg.getChildByName("headBox").getChildByName("head");
        let name = listBg.getChildByName("top_title").getChildByName("name");
        let time = listBg.getChildByName("top_title").getChildByName("time");
        let roomID = listBg.getChildByName("roomID").getChildByName("value");
        let pi = listBg.getChildByName("pi").getChildByName("value");
        let dairu = listBg.getChildByName("dairu").getChildByName("value");
        let winScore = listBg.getChildByName("winScore").getChildByName("value");
        // Main.$LoadImage(headNode, cell.dataSource.head, Main.defaultImg.one);
        name.text = cell.dataSource.roomName;
        time.text = cell.dataSource.roomTime;
        roomID.text = cell.dataSource.roomPws;
        pi.text = cell.dataSource.pi;
        dairu.text = cell.dataSource.dairu;
        winScore.text = cell.dataSource.sf;
        if (winScore.text.indexOf('+') != -1) {
            winScore.color = '#FF0000';
        } else if (winScore.text.indexOf('-') != -1) {
            winScore.color = '#8FD900';
        } else {
            winScore.color = '#98999D';
        }
    }

    /**
    * 获取页面数据
    * @param 
    */
    requestPageData() {
        Main.showLoading(true);
        let data = {
            uid: Main.userInfo.userId
        }
        HTTP.$request({
            that: this,
            url: '/M.Games.CX/GetPlayerRoomData',
            data: data,
            success(res) {
                // console.log(res)
                Main.showLoading(false);
                if (res.data.ret.type == 0) {
                    this.dealWithResData(res.data);
                } else {
                    Main.showDialog(res.data.ret.msg, 1);
                }
            },
            fail() {
                Main.showLoading(false);
                Main.showDialog('网络异常!', 1);
            }
        })
    }

    dealWithResData(data) {
        let listData = data.rooms;
        listData.forEach((item, index) => {
            let time = Main.getFormatTime(item.time * 1000);
            // if (index < 3) {
            //     time = {
            //         timeStr: '2019-11-14',
            //         month: 11,
            //         day: 13,
            //         hour: 12,
            //         minutes: 13
            //     }
            // } else {
            //     time = time;
            // }
            item.month = time.month + '月';
            item.day = time.day + '日';
            item.roomTime = time.hour + ':' + time.minutes;
            item.timeStr = time.timeStr;
            item.showTime = true;
            if (index > 0 && (time.timeStr == listData[index - 1].timeStr)) {
                item.showTime = false;
            }
        });
        this.setPageBaseData(data);
        this.setPageListData(listData);
    }

    /**
     * 设置页面基本数据
     */
    setPageBaseData(data) {
        let totalSs=data.totalSs;
        let totalSs_fenmu=totalSs==0?1:totalSs;
        this.UI.data_winRate.text = parseInt((data.winSs/totalSs_fenmu)*100)+'%';
        this.UI.data_fanpaiRate.text = parseInt((data.fpSs/totalSs_fenmu)*100)+'%';
        this.UI.data_fanpaiwinRate.text =  parseInt((data.fpWinSs/totalSs_fenmu)*100)+'%';
        this.UI.data_changshu.text = data.totalJs;
        this.UI.data_shoushu.text =data.totalSs;
        this.UI.data_winNum.text = data.winSs;
        this.UI.data_pingju.text = data.tieSs;
        this.UI.data_fail.text = data.totalSs-data.winSs-data.tieSs;
    }
}