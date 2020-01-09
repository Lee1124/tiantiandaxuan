/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import setSceneWH from "./game/common/setSceneWH"
import back from "./game/common/back"
import setHd from "./game/common/setHd"
import AboutOur from "./game/pages/AboutOur/AboutOur"
import GameUI from "./game/GameCenter/GameUI"
import seat from "./game/GameCenter/seat"
import MySlider from "./game/Fuction/MySlider"
import SetHeight from "./game/common/SetHeight"
import MyClickSelect from "./game/Fuction/MyClickSelect"
import GameControl from "./game/GameCenter/GameControl"
import Set from "./game/pages/Set/Set"
import MySwitch from "./game/common/MySwitch"
import LoginUI from "./game/pages/login/LoginUI"
import openView from "./game/common/openView"
import Login from "./game/pages/login/Login"
import roomEndUI from "./game/pages/roomEnd/roomEndUI"
import roomEnd from "./game/pages/roomEnd/roomEnd"
import paijuhuiguUI from "./game/pages/paijuhuigu/paijuhuiguUI"
import paiJuGet from "./game/pages/paijuhuigu/paiJuGet"
import paijutishiUI from "./game/pages/paijutishi/paijutishiUI"
import tishi from "./game/pages/paijutishi/tishi"
import playerNewsSetUI from "./game/pages/playerNewsSet/playerNewsSetUI"
import playerNewsSet from "./game/pages/playerNewsSet/playerNewsSet"
import registerUI from "./game/pages/register/registerUI"
import register from "./game/pages/register/register"
import service from "./game/pages/service/service"
import shishizhanjiUI from "./game/pages/shishizhanji/shishizhanjiUI"
import ZhanJiGet from "./game/pages/shishizhanji/ZhanJiGet"
import shopMallUI from "./game/pages/shopMall/shopMallUI"
import shopMall from "./game/pages/shopMall/shopMall"
import Start from "./game/Fuction/Start"
import TabPagesUI from "./game/pages/TabPages/TabPagesUI"
import Me from "./game/pages/Me/Me"
import Notice from "./game/pages/Notice/Notice"
import GameHall from "./game/pages/GameHall/GameHall"
import dropDownReload from "./game/common/dropDownReload"
import Data from "./game/pages/Data/Data"

export default class GameConfig {
    static init() {
		
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("game/common/setSceneWH.js",setSceneWH);
		reg("game/common/back.js",back);
		reg("game/common/setHd.js",setHd);
		reg("game/pages/AboutOur/AboutOur.js",AboutOur);
		reg("game/GameCenter/GameUI.js",GameUI);
		reg("game/GameCenter/seat.js",seat);
		reg("game/Fuction/MySlider.js",MySlider);
		reg("game/common/SetHeight.js",SetHeight);
		reg("game/Fuction/MyClickSelect.js",MyClickSelect);
		reg("game/GameCenter/GameControl.js",GameControl);
		reg("game/pages/Set/Set.js",Set);
		reg("game/common/MySwitch.js",MySwitch);
		reg("game/pages/login/LoginUI.js",LoginUI);
		reg("game/common/openView.js",openView);
		reg("game/pages/login/Login.js",Login);
		reg("game/pages/roomEnd/roomEndUI.js",roomEndUI);
		reg("game/pages/roomEnd/roomEnd.js",roomEnd);
		reg("game/pages/paijuhuigu/paijuhuiguUI.js",paijuhuiguUI);
		reg("game/pages/paijuhuigu/paiJuGet.js",paiJuGet);
		reg("game/pages/paijutishi/paijutishiUI.js",paijutishiUI);
		reg("game/pages/paijutishi/tishi.js",tishi);
		reg("game/pages/playerNewsSet/playerNewsSetUI.js",playerNewsSetUI);
		reg("game/pages/playerNewsSet/playerNewsSet.js",playerNewsSet);
		reg("game/pages/register/registerUI.js",registerUI);
		reg("game/pages/register/register.js",register);
		reg("game/pages/service/service.js",service);
		reg("game/pages/shishizhanji/shishizhanjiUI.js",shishizhanjiUI);
		reg("game/pages/shishizhanji/ZhanJiGet.js",ZhanJiGet);
		reg("game/pages/shopMall/shopMallUI.js",shopMallUI);
		reg("game/pages/shopMall/shopMall.js",shopMall);
		reg("game/Fuction/Start.js",Start);
		reg("game/pages/TabPages/TabPagesUI.js",TabPagesUI);
		reg("game/pages/Me/Me.js",Me);
		reg("game/pages/Notice/Notice.js",Notice);
		reg("game/pages/GameHall/GameHall.js",GameHall);
		reg("game/common/dropDownReload.js",dropDownReload);
		reg("game/pages/Data/Data.js",Data);
    }
}
GameConfig.width = 1242;
GameConfig.height = 2208;
GameConfig.scaleMode ="fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "start.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
