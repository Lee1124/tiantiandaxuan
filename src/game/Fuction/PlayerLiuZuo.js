/**
 * 玩家留座离桌功能
 */
import GameControl from '../GameCenter/GameControl';
import MyClickSelect from './MyClickSelect';
import Main from '../common/Main';
class PlayerLiuZuo {
    constructor() {
        this.selectNum = 150;
    }
    /**
  * 打开留座的弹框
  * @param {*} that 执行域
  */
    open(that) {
        this.GameUI = that;
        this.GameControl = GameControl.instance;
        this.MeSeatArr = this.GameControl._playerArray.filter(item => item.owner.isMe);
        if (this.MeSeatArr.length > 0) {
            this.init();
            this.common(true);
        } else {
            this.GameUI.showTips('您当前为观战模式，无法留座!');
        }
    }
    common(show) {
        let showObj = this.GameUI.LiuZuo_dialog;
        let maskAlpha = 0;
        let y = show ? (Laya.stage.height - showObj.height) / 2 : Laya.stage.height;
        this.GameControl.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    /**
     * 关闭留座的弹框
     */
    close() {
        if (this.GameUI && this.GameControl)
            this.common(false);
    }

    /**
    * 确认
    */
    confrim() {
        let confrimBtn = this.GameUI.LiuZuo_dialog.getChildByName("confrimBtn");
        confrimBtn.on(Laya.Event.CLICK, this, this.confrimLiuZuo);
    }

    /**
     * 关闭按钮关闭
     */
    closeBtnEvent() {
        let closeBtn = this.GameUI.LiuZuo_dialog.getChildByName("close");
        closeBtn.on(Laya.Event.CLICK, this, this.close);
    }

    /**
     * 初始化
     */
    init() {
        this.closeBtnEvent();
        this.confrim();
        this.returnSeat();
        this.selectTime();
        this.setPageData();
    }

    setPageData() {
        this.selectListBox = this.GameUI.LiuZuo_dialog.getChildByName("selectListBox");
        let list = this.selectListBox.getChildByName("selectList");
        list.visible = true;
        // list.vScrollBarSkin = "";//运用滚动
        list.array = [
            { img: 'res/img/LiuZuo/120.png', value: 150 },
            { img: 'res/img/LiuZuo/300.png', value: 300 }
        ]
        list.renderHandler = new Laya.Handler(this, this.listRenderHandler);
    }

    listRenderHandler(cell) {
        let $label = cell.getChildByName("listRow").getChildByName("label");
        $label.skin = cell.dataSource.img;
    }

    /**
     * 选择时间
     */
    selectTime() {
        let selectListBox = this.GameUI.LiuZuo_dialog.getChildByName("selectListBox");
        let $MyClickSelect = selectListBox.getComponent(MyClickSelect);
        $MyClickSelect.MySelect(this, 0, (res) => {
            this.selectNum = res;
        })
    }

    /**
     * 确认留座位
     */
    confrimLiuZuo() {
        this.close();
        this.request(true);
    }

    request(state) {
        let that = this;
        GameControl.instance.onSend({
            name: 'M.Room.C2R_Reservation',
            data: {
                roomid: GameControl.instance.roomId,
                reservation: state,
                consume: this.selectNum
            },
            success(res) {
                GameControl.instance.dealSoketMessage('留座：', res);
            }
        })
    }

    /**
     * 回到座位上
     */
    returnSeat() {
        GameControl.instance.owner.returnSeatBtn.on(Laya.Event.CLICK, this, this.request, [false]);
    }

    /**
     * 设置玩家相关数据
     */
    start(that, data) {
        this.returnSeat();
        this.playerLiuZuoDealContent(that, data);
    }
    /**
    * 玩家留座数据处理
    */
    playerLiuZuoDealContent(that, data) {
        that.liuzuoAllTime = data.seatAtTime - Main.getTimeChuo();
        that.liuzuoAllTime = that.liuzuoAllTime > data.totalTime ? data.totalTime : that.liuzuoAllTime;
        let liuzuosign = that.owner.getChildByName('liuzuoSign');
        let returnSeatBtn = GameControl.instance.owner.returnSeatBtn;
        liuzuosign.visible = true;
        if (data.userId == GameControl.instance.userId)
            returnSeatBtn.visible = true;
        let scoreVal = that.owner.getChildByName("score")._children[0].getChildByName("scoreVal");
        scoreVal.text = '留座' + that.liuzuoAllTime + 's';
        Laya.timer.loop(1000, that, that.palyerLiuZuoTime, [scoreVal]);
    }

    time(that, scoreVal) {
        that.liuzuoAllTime--;
        scoreVal.text = '留座' + that.liuzuoAllTime + 's';
        if (that.liuzuoAllTime <= 0)
            Laya.timer.clear(that, that.palyerLiuZuoTime);
    }

    /**
     * 玩家留座结束
     */
    end(that, data) {
        Laya.timer.clear(that, that.palyerLiuZuoTime);
        let liuzuosign = that.owner.getChildByName('liuzuoSign');
        let returnSeatBtn = GameControl.instance.owner.returnSeatBtn;
        liuzuosign.visible = false;
        if (data.userId == GameControl.instance.userId)
            returnSeatBtn.visible = false;
    }
}
export default new PlayerLiuZuo();