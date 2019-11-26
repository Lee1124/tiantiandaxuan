import HTTP from '../../common/HttpRequest';
import Main from '../../common/Main';
import CountPoint from '../../common/CountPoint';//查找点数
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
        let paijuhuiguBg = this.owner.getChildByName("paijuhuiguBg")
        // let ListView = paijuhuiguBg.getChildByName("ListView");
        // let ListViewHeight = ListView.height;
        // this.list = ListView.getChildByName("paiJuList");
        // this.list.repeatY = parseInt(ListViewHeight / 220);
        paijuhuiguBg.right = -paijuhuiguBg.width;
        this.owner.x = 0;
        this.owner.zOrder = 10;
        this.owner.diaLogMask.visible = true;
        Laya.Tween.to(paijuhuiguBg, { right: 0 }, 150, null, Laya.Handler.create(this, this.showEnd));
    }

    // 显示菜单完成
    showEnd() {
        HTTP.$request({
            that: this,
            url: '/M.Games.CX.Ext/Log/GetPokerLog',
            data: {
                uid: this.owner.openData.userId,
                roomid: this.owner.openData.roomId,
                page: 1
            },
            success(res) {
                if (res.data.ret.type == 0) {
                    this.setPageData(res.data);
                } else {
                    console.log(res.data.ret.msg);//=========================后加弹框=======================
                }
            }
        })
        this.owner.preBtn.on(Laya.Event.CLICK, this, this.clickTurn, [1]);
        this.owner.nextBtn.on(Laya.Event.CLICK, this, this.clickTurn, [2])
    }

    clickTurn(type) {
        if (type == 2) {
            this.owner.preText.text = parseInt(this.owner.preText.text) + 1;
            if (this._LIST.length <= 30) {
                this.owner.preText.text = this.owner.preText.text > this._LIST.length ? this._LIST.length : this.owner.preText.text;
            } else {
                this.owner.preText.text = this.owner.preText.text > 30 ? 30 : this.owner.preText.text;
            }
        } else {
            this.owner.preText.text -= 1;
            this.owner.preText.text = this.owner.preText.text < 1 ? 1 : this.owner.preText.text;
            if(this._LIST.length==0){
                this.owner.preText.text=0;
            }
        }
        this.setList(this.owner.preText.text - 1);
    }

    setPageData(data) {
        Main.$LOG('获取牌局回顾数据：', data);
        this.owner.allSSValue.text = data.maxCount;
        this.owner.nextText.text = data.maxCount <= 30 ? data.maxCount : 30;
        this.owner.preText.text = data.maxCount <= 30 ? data.maxCount : 30;
        this._LIST = data.pokerLog;
        this.setList(this._LIST.length - 1);
    }

    setList(index) {
        let list=this.owner.paiJuList;
        list.visible = true;
        list.vScrollBarSkin = "";//运用滚动
        list.array = this._LIST[index];
        list.renderHandler = new Laya.Handler(this, this.listOnRender);
    }

    listOnRender(cell, index) {
        // console.log(cell)
        let personNews = cell.getChildByName("personNews");
        let name = personNews.getChildByName("name");
        let head = personNews.getChildByName("head");
        let zt = personNews.getChildByName("zt");
        let zhuang = personNews.getChildByName("zhuang");
        name.text = cell.dataSource.name;
        Main.$LoadImage(head, cell.dataSource.head, Main.defaultImg.one);
        zhuang.visible = cell.dataSource.zhuang;
        if (cell.dataSource.opt==2) {
            zt.loadImage('res/img/Status_1.png');
        } else if(cell.dataSource.opt==1){
            zt.loadImage('res/img/Status_0.png');
        }else if(cell.dataSource.opt==0){
            zt.loadImage('');
        }
        let dataView = cell.getChildByName("dataView");
        let mangScore = dataView.getChildByName("mangScore");
        let xiaZhu = dataView.getChildByName("xiaZhu");
        let getScore = dataView.getChildByName("getScore");
        xiaZhu.text = cell.dataSource.xiazhu;
        mangScore.visible = cell.dataSource.mang > 0 ? true : false;
        mangScore.text = cell.dataSource.mang > 0 ? cell.dataSource.mang : 0;
        if (cell.dataSource.sfscore > 0) {
            getScore.text = '+' + cell.dataSource.sfscore;
        } else if (cell.dataSource.sfscore < 0) {
            getScore.text = cell.dataSource.sfscore;
        } else {
            getScore.text = cell.dataSource.sfscore;
        }
        if (getScore.text.indexOf('-') != -1) {
            getScore.color = '#51A97A';
        } else if (getScore.text.indexOf('+') != -1) {
            getScore.color = '#FF0000';
        } else {
            getScore.color = '#916014';
        }

        let userId = cell.dataSource.userId;
        let nosanhuaBox = cell.getChildByName("noSHPokerBox");
        let sanhuaBox = cell.getChildByName("SHPokerBox");
        let leftPoker = nosanhuaBox.getChildByName("leftPoker");
        let rightPoker = nosanhuaBox.getChildByName("rightPoker");
        let sanhua_leftPoker = sanhuaBox.getChildByName("leftPoker");
        let sanhua_rightPoker = sanhuaBox.getChildByName("rightPoker");
        let isSanHua = null;
        let point1Text = '';
        let point2Text = '';
        let left_pointText = leftPoker.getChildByName("pointText");
        let right_pointText = rightPoker.getChildByName('pointText');
        if (cell.dataSource.pokers.length >= 3) {
            isSanHua = CountPoint.sanHuaPoker(cell.dataSource.pokers[0].poker, cell.dataSource.pokers[1].poker, cell.dataSource.pokers[2].poker);
            if (cell.dataSource.opt==2 && !isSanHua) {
                point1Text = CountPoint.countPoint(cell.dataSource.pokers[0].poker, cell.dataSource.pokers[1].poker);
                point2Text = CountPoint.countPoint(cell.dataSource.pokers[2].poker, cell.dataSource.pokers[3].poker);
                left_pointText.text = point1Text;
                right_pointText.text = point2Text;
            } else if (cell.dataSource.opt!=2) {
                left_pointText.text = '';
                right_pointText.text = '';
            }
        }

        cell.dataSource.pokers.forEach((item, index) => {
            if (cell.dataSource.pokers.length == 2) {
                nosanhuaBox.visible = true;
                sanhuaBox.visible = false;
                let pokerName = 'poker' + (index + 1);
                let poker = leftPoker.getChildByName(pokerName);
                let poker34 = rightPoker.getChildByName('poker' + (index + 3));
                let showPokerSign = poker.getChildByName("showPokerSign");
                poker.loadImage('res/img/poker/' + item.poker + '.png');
                poker34.loadImage('');
                showPokerSign.visible = item.isShow;
                left_pointText.text = '';
                right_pointText.text = '';
                let diPaiSign = poker34.getChildByName("sign");
                diPaiSign.visible = false;
            } else {
                nosanhuaBox.visible = !isSanHua ? true : false;
                sanhuaBox.visible = isSanHua ? true : false;
                if (!isSanHua) {
                    let pokerName = 'poker' + (index + 1);
                    let poker = index <= 1 ? leftPoker.getChildByName(pokerName) : rightPoker.getChildByName(pokerName);
                    let showPokerSign = index <= 1 ? poker.getChildByName("showPokerSign") : null;
                    let diPaiSign = poker.getChildByName("sign");
                    poker.loadImage('res/img/poker/' + item.poker + '.png');
                    if (showPokerSign)
                        showPokerSign.visible = cell.dataSource.opt==2 ? false : item.isShow;
                    diPaiSign.visible = cell.dataSource.opt==2 ? item.isdipoker : false;
                    let poker4 = rightPoker.getChildByName('poker4');
                    if (cell.dataSource.pokers.length == 3)
                        poker4.loadImage('');
                } else {
                    let pokerName = 'poker' + (index + 1);
                    let poker = index <= 2 ? sanhua_leftPoker.getChildByName(pokerName) : sanhua_rightPoker.getChildByName(pokerName);
                    poker.loadImage('res/img/poker/' + item.poker + '.png');
                }
            }
        })
    }
}