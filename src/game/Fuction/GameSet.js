/**
 * 该脚本为游戏设置功能
 */
import GameControl from '../GameCenter/GameControl';
import Main from '../common/Main';
class GameSet {
    /**
     * 初始化设置
     * @param that 执行域
     */
    initGameSet(that) {
        this.GameUI = that;
        this.GameControl = GameControl.instance;
        this.setGameView();
        this.getGameSetVal();
    }
    open() {
        this.common(true);
        this.bindEvent(true);
        this.setSwitch();
        this.gameSetRegisterEvent();
    }
    common(show){
        let showObj = GameControl.instance.owner.gameSet_dialog;
        let maskAlpha = 0;
        let y = show ? (Laya.stage.height - showObj.height) / 2 : -showObj.height;
        GameControl.instance.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    close(){
        this.common(false);
        this.bindEvent(false);
        this.gameSetRegisterEventOff();
    }
     /**
     * 绑定事件或移除事件
     * @param {*} isBind 是否绑定事件
     */
    bindEvent(isBind) {
        let mask = GameControl.instance.owner._mask;
        if (isBind)
            mask.on(Laya.Event.CLICK, this, this.close);
        else
            mask.off(Laya.Event.CLICK);
    }
    setGameView() {
        let deskView = localStorage.getItem('deskView') ? localStorage.getItem('deskView') : 'desk_bg1';
        if(Main.wxGame){//是微信端
            Main.$LoadImage(this.GameUI.deskBg,Main.gameView['wx_'+deskView],Main.gameView.wx_desk_bg1,'skin');
        }else{
            Main.$LoadImage(this.GameUI.deskBg,Main.gameView[deskView],Main.gameView.desk_bg1,'skin');
        }
        this.GameUI.gameSet_deskViewBox._children.forEach(item => {
            item.getChildByName("desk").getChildByName("selectSign").visible = false;
            if (item.name == deskView) {
                item.getChildByName("desk").getChildByName("selectSign").visible = true;
            }
        })
    }
    /**
   * 游戏设置注册事件
   */
    gameSetRegisterEvent() {
        this.GameUI.gameSet_deskViewBox._children.forEach(item => {
            item.on(Laya.Event.CLICK, this, this.onClickThisDeskView, [item])
        });
    }
    gameSetRegisterEventOff() {
        this.GameUI.gameSet_deskViewBox._children.forEach(item => {
            item.off(Laya.Event.CLICK);
        });
        GameControl.instance.owner.game_music_switchBox.off(Laya.Event.CLICK);
        GameControl.instance.owner.game_chat_switchBox.off(Laya.Event.CLICK);
    }
    onClickThisDeskView(itemObj) {
        localStorage.setItem('deskView', itemObj.name);
        this.setGameView();
    }
   
    setSwitch() {
        this.getGameSetVal();
        let game_music_switchBox = this.GameUI.game_music_switchBox;
        let game_chat_switchBox = this.GameUI.game_chat_switchBox;
        Main.$switch(game_music_switchBox, Main.gameSetVal.gameMusic, this, (res) => {
            let val = res ? 1 : 0;
            localStorage.setItem('gameMusic', val);
        })
        Main.$switch(game_chat_switchBox, Main.gameSetVal.chatVoice, this, (res) => {
            let val = res ? 1 : 2;
            localStorage.setItem('chatVoice', val);
            Main.chatVoiceOpenState=localStorage.getItem('chatVoice')?localStorage.getItem('chatVoice')==1?true:false:true;
        })
    }
    getGameSetVal() {
        Main.gameSetVal = {
            gameMusic: localStorage.getItem("gameMusic") ? localStorage.getItem("gameMusic") : 1,
            chatVoice: localStorage.getItem("chatVoice") ? localStorage.getItem("chatVoice") : 1,
            pangGuanchat: localStorage.getItem("pangGuanchat") ? localStorage.getItem("pangGuanchat") : 1
        }
    }
}
export default new GameSet();