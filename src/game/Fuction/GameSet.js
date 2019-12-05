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
        this.gameSetRegisterEvent();
        this.setGameView();
        this.getGameSetVal();
    }
    setGameView() {
        let deskView = localStorage.getItem('deskView') ? localStorage.getItem('deskView') : 'desk_bg1';
        Main.$LoadImage(this.GameUI.deskBg,Main.gameView[deskView],Main.gameView.desk_bg1,'skin');
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
    onClickThisDeskView(itemObj) {
        localStorage.setItem('deskView', itemObj.name);
        this.setGameView();
    }
    gameSet(show) {
        let showObj = this.GameUI.gameSet_dialog;
        let maskAlpha = 0;
        let y = show ? (Laya.stage.height - showObj.height) / 2 : -showObj.height;
        this.GameControl.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
        this.setSwitch();
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
            // console.log(res)
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