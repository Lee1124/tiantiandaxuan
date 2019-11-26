import HTTP from '../../common/HttpRequest';
import Main from '../../common/Main';
export default class zhanji extends Laya.Script {

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
    onStart() {
        Main.$LOG('组件信息：', this);
        this.setPersonListRowNum();
    }

    onDisable() {
    }

    setPersonListRowNum() {
        let shishizhanjiBg = this.owner.getChildByName("shishizhanjiBg")
        this.owner.x = 0;
        this.owner.zOrder = 10;
        this.owner.diaLogMask.visible = true;
        shishizhanjiBg.x = -Laya.stage.width;
        Laya.Tween.to(shishizhanjiBg, { x: 0 }, 150, null, Laya.Handler.create(this, this.showEnd));
    }

    // 显示菜单完成
    showEnd() {
        HTTP.$request({
            that: this,
            url: '/M.Games.CX.Ext/Record/RealTimeRecord',
            data: {
                uid: Main.userInfo.userId,
                roomid: this.owner.openData.roomId
            },
            success(res) {
                if (res.data.ret.type == 0) {
                    this.setPageData1(res.data.data);
                } else {
                    console.log(res.data.ret.msg);//=========================后加弹框=======================
                }
            }
        })
    }

    setPageData1(data) {
        Main.$LOG('获取实时战绩的表格1数据：', data);
        if (this.TimeID) {
            clearInterval(this.TimeID);
        }
        this.TimeID = setInterval(() => {
            data.end_time--;
            this.owner.roomLastTime.text = Main.secondToDate(data.end_time);
            if (data.end_time == 0) {
                clearInterval(this.TimeID);
            }
        }, 1000);
        this.owner.allDaiRuValue.text = data.all_dairu;
        this.owner.allGetScore.text = data.all_sf;
        setTimeout(() => {
            this.owner.weiGuanTitle.width = this.owner.weiGuanTitle.getChildAt(0).textWidth;
        })
        this.owner.weiGuanTitle.text = '（' + data.onlooker.length + '）';
        this.setList1(data.dairu);
        this.setList2(data.onlooker);
    }

    setList1(data) {
        let list1 = this.owner.zhanjiList;
        list1.visible = true;
        list1.vScrollBarSkin = "";//运用滚动
        list1.array = data;
        list1.renderHandler = new Laya.Handler(this, this.list1OnRender);
    }

    list1OnRender(cell, index) {
        let name = cell.getChildByName("name");
        let dairu = cell.getChildByName("dairu");
        let score = cell.getChildByName("score");
        name.text = cell.dataSource.nick;
        dairu.text = cell.dataSource.dairu;
        score.text = cell.dataSource.sf;
        if (parseInt(score.text) === 0) {
            score.color = '#935F13';
        } else if (score.text.indexOf('+') != -1) {
            score.color = '#c53233';
        } else if (score.text.indexOf('-') != -1) {
            score.color = '#599E73';
        }
    }

    setList2(data) {
        let list2 = this.owner.PersonList;
        list2.visible = true;
        list2.vScrollBarSkin = "";//运用滚动
        list2.array = data;
        list2.renderHandler = new Laya.Handler(this, this.list2OnRender);
    }

    list2OnRender(cell, index) {
        let name = cell.getChildByName("name");
        let head = cell.getChildByName("headImg");
        Main.$LoadImage(head, cell.dataSource.head, Main.defaultImg.one, 'skin');
        name.text = cell.dataSource.nick;
    }
}