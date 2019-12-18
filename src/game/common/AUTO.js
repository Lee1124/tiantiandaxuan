import Main from '../common/Main';
import HTTP from '../common/HttpRequest';
class Auto {
    constructor() {
        //房间列表索引(例如：10条数据即0-9随机数)
        this.hallIndex = 0;
        //大厅数据便利到哪里了
        this.hallDataNum = 1;
        //操作时候的数据
        this.handleData = null;

    }
    /**初始化大厅界面 */
    initHall(that, data) {
        setTimeout(() => {
            this.openGame(that, data);
        }, 500)
    }
    /**打开游戏界面 */
    openGame(that, data) {
       
        // this.hallIndex = parseInt(Math.random() * (data.length));
        let filterRoom = data.filter(item=>item.participate<8);
        // console.log(filterRoom)
        if (filterRoom.length>0) {
            Main.showLoading(true, Main.loadingType.three, '正在进入房间...');
            let _data = {
                roomPws: filterRoom[0].roomPws,
                // roomPws: 112471,
                page: Main.pages.page3
            }
            // console.log(_data)
            Main.$openScene('cheXuanGame_8.scene', true, _data, () => {
                Main.showLoading(false, Main.loadingType.three, '');
            });
            return false;
        } else {
            that.selectThisTab(that.UI.hall_nav_bg._children[that._selectNavType], that._selectNavType);//默认选择第一项
        }
    }

    /**进入房间后占座 */
    intoAfterSeatAt(that,ID=0) {
        let _this=this;
        // let kongSeat = that._playerArray.filter(item => item.owner.userId == '');
        let kongSeat=[that._playerArray[ID]];
        Main.$LOG('位置对象：',kongSeat)
        if(kongSeat[0]){
            that.onSend({
                name: 'M.Room.C2R_SeatAt',
                data: {
                    roomid: that.roomId,
                    idx: kongSeat[0].owner.seatId
                },
                success(res) {
                    // console.log('占座：',res)
                    that.dealSoketMessage('占位：', res)
                    if (res.ret.type == 0) {
                        let click_seat_index = kongSeat[0].owner.index;
                        that.changeSeatXY(click_seat_index, that._speed.changeSeatSpeed);
                        return false;
                    }else{
                        _this.intoAfterSeatAt(that,ID+1);
                    }
                }
            })
        }else{
            that.playerLeaveRoomSend();
        }
    }

    /**自己操作 */
    handle(that, data) {
        //随机操作的索引
        let handleIndex = parseInt(Math.random() * (data.opts.length));
        //随机操作对应的编号
        let handleNum = data.opts[handleIndex];
        if (handleNum == 3) {
            Main.AUTONUM++;
            // console.log('AUTONUM============>',Main.AUTONUM);
            if (Main.AUTONUM <= 10) {
                this.handle(that, data);
            } else {
                Main.AUTONUM = 0;
                that.onClickLeftBtn(handleNum);
            }
        } else if (handleNum == 2 || handleNum == 4) {
            let genScore;
            if ((data.xiazu + data.score) >= data.maxXiazu) {
                genScore = handleNum == 2 ? data.maxXiazu : 0;
            } else {
                genScore = handleNum == 2 ? (data.xiazu + data.score) : 0;
            }
            that.onClickRightBtn(handleNum, genScore);
        } else if (handleNum == 5) {
            let qiaoScore = data.score;
            that.onClickTopBtn(handleNum, qiaoScore);
        } else if (handleNum == 6) {
            let genScore;
            if ((data.xiazu + data.score) >= data.maxXiazu) {
                genScore = handleNum == 6 ? data.maxXiazu : 0;
            } else {
                genScore = handleNum == 6 ? (data.xiazu + data.score) : 0;
            }
            that.onClickRightBtn(2, genScore);
        } else if (handleNum == 1) {
            that.daSendSoket(data.maxXiazu * 2 + data.xiazu, handleNum);
        }
    }

    /**注册新账号 */
    registerNewUser(that,fn){
        let url = "/M.Acc/Register";
        HTTP.$request({
            that: that,
            url: url,
            data: {
                name: Main.userInfo.user,
                pws: Main.userInfo.pwd,
                code: 1234
            },
            success(res) {
                // console.log(res)
                if (res.data.ret.type == 0) {
                    let data = {
                        user: Main.userInfo.user,
                        pwd: Main.userInfo.pwd,
                    }
                    Main.userInfo=data;
                    Main.showDiaLog('注册成功,返回登录',1);
                    setTimeout(()=>{
                        Main.closeDiaLog();
                        if(fn)
                            fn.call(that)
                    },600)
                } else {
                    Main.showDiaLog(res.data.ret.msg);
                }
            },
            fail(){
            }
        })
    }
}
export default new Auto();