import TIP from '../common/SuspensionTips'
class Main {
    constructor() {
        this.AUTONUM=0;
        this.AUTO=false;
        Main.instance = this;
        // this.websoketApi = '192.168.0.125:8082';
        // this.requestApi = 'http://192.168.0.125:8081';
        this.websoketApi = '132.232.34.32:8082';
        this.requestApi = 'http://132.232.34.32:8081';
        //手机信息
        this.phoneNews = {
            statusHeight: 0,//手机系统栏的高度
            deviceNews: '',//系统名称：Android / iOS
        }
        //是不是微信小游戏平台
        this.wxGame=false;
        //用户信息
        // this.userInfo =this.wxGame?'1111':JSON.parse(localStorage.getItem("userInfo"));
        this.userInfo =null;
        // this.$LOG('Main.js获取用户信息：', this.userInfo);
        //跳转划出界面标志
        this.sign = {
            signOut: 1,
            register: 2,
            changePwd: 3,
            shop: 4
        }
        //联系客服地址
        this.serviceUrl = '';
        //界面
        this.pages = {
            page1: 'NoticePage',
            page2: 'CreateGamePage',
            page3: 'HallPage',
            page4: 'DataPage',
            page5: 'MePage',
            page6: 'login'
        }
        this.gameView = {
            desk_bg1: 'res/img/gameView/desk_bg1.png',
            desk_bg2: 'res/img/gameView/desk_bg2.png'
        }
        //所有扑克的名字(在这里为了预加载，避免翻牌的渲染过慢)
        this.gamePoker = [0, 1, 2, 4, 5, 6, 8, 10, 15, 16, 17, 18, 19, 20, 21, 22, 28, 29, 30, 31, 32, 33, 34, 35, 39, 41, 43, 44, 45, 47, 49, 53, -1]
        this.loadScene = ['cheXuanGame_8.scene', 'playerNewsSet.scene', 'register.scene', 'shishizhanji.scene',
            'paijuhuigu.scene', 'paijutishi.scene', 'paijutishi.scene', 'tabPage.scene', 'shoppingMall.scene',
            'aboutOur.scene', 'gameSet.scene', 'service.scene'];
        this.allowGameHallSetInterval = false;
        this.allowRequesList = true;
        this.allowHideLoad = false;
        this.defaultImg = {
            one: 'res/img/common/defaultHead.png'
        }

        this.animations = {
            qiao: 'qiao',
            win: 'win',
            expression: 'expression'
        }

        this.loadingType = {
            one: 'Loading',
            two: 'Loading2',
            three: 'Loading3',
            four: 'Loading4',
        }

        //文字语音聊天列表
        this.chatVoice = [
            { id: 0, voice: 'res/sounds/Man_Chat_0.wav', text: '大家好,很高兴见到各位!' },
            { id: 1, voice: 'res/sounds/Man_Chat_1.wav', text: '和您合作真是太愉快了哈!' },
            { id: 2, voice: 'res/sounds/Man_Chat_2.wav', text: '快点呀,都等得我花儿都谢了!' },
            { id: 3, voice: 'res/sounds/Man_Chat_3.wav', text: '您的牌打得也太好了呀!' },
            { id: 4, voice: 'res/sounds/Man_Chat_4.wav', text: '不要吵了,不要吵了,吵啥嘛吵，专心玩游戏吧!' },
            { id: 5, voice: 'res/sounds/Man_Chat_5.wav', text: '怎么又断线了，网络怎么这么差呀!' },
            { id: 6, voice: 'res/sounds/Man_Chat_6.wav', text: '各位，真是不好意思呀，我得离开一会儿!' },
            { id: 7, voice: 'res/sounds/Man_Chat_7.wav', text: '不要走,决战到天亮呀!' },
            { id: 8, voice: 'res/sounds/Man_Chat_8.wav', text: '你是GG，还是MM?' },
            { id: 9, voice: 'res/sounds/Man_Chat_9.wav', text: '咱交个朋友吧,能告诉我您咋联系的吗!' },
            { id: 10, voice: 'res/sounds/Man_Chat_10.wav', text: '再见啦,俺会想念大家的!' }
        ];

        //表情聊天列表
        this.expressionChat = [
            { id: 0, icon: 'res/img/Expression/0_0.png' },
            { id: 1, icon: 'res/img/Expression/1_0.png' },
            { id: 2, icon: 'res/img/Expression/2_0.png' },
            { id: 3, icon: 'res/img/Expression/3_0.png' },
            { id: 4, icon: 'res/img/Expression/4_0.png' },
            { id: 5, icon: 'res/img/Expression/5_0.png' },
            { id: 6, icon: 'res/img/Expression/6_0.png' },
            { id: 7, icon: 'res/img/Expression/7_0.png' },
            { id: 8, icon: 'res/img/Expression/8_0.png' },
            { id: 9, icon: 'res/img/Expression/9_0.png' },
            { id: 10, icon: 'res/img/Expression/10_0.png' },
            { id: 11, icon: 'res/img/Expression/11_0.png' },
            { id: 12, icon: 'res/img/Expression/12_0.png' },
            { id: 13, icon: 'res/img/Expression/13_0.png' },
            { id: 14, icon: 'res/img/Expression/14_0.png' }
        ]

        this._speed = {
            page: 120
        }
        this.loadSceneResourcesArr = [];
        this.openSceneViewArr = [];
        this.loadAniArr1 = [];
        this.loadAniArr2 = [];
        this.loadShowArr = [];
        this.loadShowArr2 = [];
        this.debug = true;

        this.errList = [];
        this.tipArr1 = [];
        this.tipArr2 = [];
        this.diaLogArr1 = [];
        this.diaLogArr2 = [];

        //聊天声音打开状态
        this.chatVoiceOpenState = localStorage.getItem('chatVoice') ? localStorage.getItem('chatVoice') == 1 ? true : false : true;
    }

    $LOG(...data) {
        if (this.debug)
            console.log(...data);
    }

    $ERROR(...data) {
        if (this.debug)
            console.error(...data);
    }

    /**
     * 获取地址栏信息
     * @param {String} name 名称
     */
    GetUrlString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    /**
     * 创建一个tip节点
     */
    createTipBox() {
        let tipBox = new Laya.Image();
        tipBox.zOrder = 40;
        tipBox.name = 'tipBox';
        tipBox.height = 300;
        tipBox.left = 0;
        tipBox.right = 0;
        tipBox.pivot(tipBox.width / 2, tipBox.height / 2);
        tipBox.pos((Laya.stage.width - tipBox.width) / 2, (Laya.stage.height - tipBox.height) / 2)
        Laya.stage.addChild(tipBox);
        tipBox.addComponent(TIP);
        this.tipArr1 = ['tipBox'];
        this.tipArr2.forEach(item => {
            let tipJS = tipBox.getComponent(TIP);
            tipJS.add(item.msg);
            this.tipArr2 = [];
            return;
        })
    }

    /**
     * 显示提示
     * @param {*} msg 提示文字
     */
    showTip(msg) {
        this.tipArr1.forEach(item => {
            let tipBox = Laya.stage.getChildByName(item);
            if (tipBox) {
                let tipJS = tipBox.getComponent(TIP);
                tipJS.add(msg);
            }
        })
        if (this.tipArr1.length == 0)
            this.tipArr2 = [{ msg: msg }];
    }

    /**
    * 获取状态栏高度入口
    */
    getStatusHeight(obj) {
        if (window.plus) {
            this.plusReady();
            this.getDeviceInfo();
        } else {
            document.addEventListener('plusready', this.plusReady, false);
            document.addEventListener('getDeviceInfo', this.getDeviceInfo, false);
        }
    }
    /**
     * 获取状态栏高度值
     */
    plusReady() {
        // 获取系统状态栏样式
        var lh = plus.navigator.getStatusbarHeight();
        this.phoneNews.statusHeight = lh * plus.screen.scale;
    }

    getDeviceInfo() {
        this.phoneNews.deviceNews = plus.os.name;
    }

    /**
     * 根据状态栏设置元素的top值
     * @param nodeArr 节点对象 数组
     */
    setNodeTop(nodeArr) {
        // console.log('手机系统：',this.phoneNews.deviceNews,this.phoneNews.statusHeight)
        if (this.phoneNews.deviceNews == 'Android') {
            nodeArr.forEach(node => {
                node.top = node.top + this.phoneNews.statusHeight;
                console.log(node.top)
            })
        }
    }

    /**
     * 获取当前时间戳(以S为单位)
     */
    getTimeChuo() {
        return Math.round(new Date() / 1000)
    }

    /**
     * 获取地址栏信息(eg:id)
     */
    GetUrlString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    /**
     * 预创建弹框
     */
    createDiaLog() {
        let that = this;
        //弹框遮罩
        let myMask = Laya.stage.getChildByName("dialogMask");
        if (myMask) {
            myMask.removeSelf();
        }
        let Mask = new Laya.Sprite();
        this.diaLogMask = Mask;
        Mask.visible = false;
        Mask.zOrder = 4;
        Mask.pos(0, 0);
        Mask.size(Laya.stage.width, Laya.stage.height);
        //弹框对象
        this.diaLog = new Laya.Dialog();
        this.diaLog.pos((Laya.stage.width - 1132) / 2, (Laya.stage.height - 764) / 2);
        this.diaLog.size(1132, 764);
        this.diaLog.zOrder = 5;
        //弹框背景
        let dialogBg = new Laya.Image();
        dialogBg.pos(0, 0);
        dialogBg.loadImage('res/img/diglog/bg.png');
        //弹框文字内容
        let dialogContent = new Laya.Text();
        dialogContent.fontSize = 60;
        dialogContent.color = '#935F13';
        dialogContent.size(1132, 180);
        dialogContent.align = 'center';
        dialogContent.valign = 'middle';
        dialogContent.y = 250;
        dialogContent.text = '';
        //创建一个确认按钮
        let btn_one = new Laya.Image();
        btn_one.size(609, 163);
        btn_one.loadImage('res/img/diglog/btn_one.png', Laya.Handler.create(this, () => {
            btn_one.pos((1132 - btn_one.width) / 2, 764 - btn_one.height - 60);
        }));

        //创建一个确认按钮和一个取消按钮
        let btn_cancel = new Laya.Image();
        let btn_comfirm = new Laya.Image();
        btn_cancel.size(460, 163);
        btn_comfirm.size(460, 163);
        btn_cancel.loadImage('res/img/diglog/btn_cancel.png', Laya.Handler.create(this, () => {
            btn_cancel.pos(72, 764 - btn_cancel.height - 60);
        }))
        btn_comfirm.loadImage('res/img/diglog/btn_comfirm.png', Laya.Handler.create(this, () => {
            btn_comfirm.pos(600, 764 - btn_comfirm.height - 60);
        }))
        dialogBg.addChild(dialogContent);
        dialogBg.addChild(btn_one);
        dialogBg.addChild(btn_cancel);
        dialogBg.addChild(btn_comfirm);
        this.diaLog.addChild(dialogBg);
        Mask.addChild(this.diaLog);
        Laya.stage.addChild(Mask);
        this.diaLogArr1 = [{ btn1: btn_one, btn2: btn_cancel, btn3: btn_comfirm, msg: dialogContent }];
        this.diaLogCommon();
    }

    closeDiaLog() {
        this.diaLog.close();
        this.diaLogMask.visible = false;
        let arr = this.diaLogArr1[0];
        arr.btn1.off(Laya.Event.CLICK);
        arr.btn2.off(Laya.Event.CLICK);
        arr.btn3.off(Laya.Event.CLICK);
    }

    diaLogCommon() {
        let arr1 = this.diaLogArr1[0];
        this.diaLogArr2.forEach(item => {
            arr1.btn1.visible = item.type == 1 ? true : false;
            arr1.btn2.visible = item.type == 2 ? true : false;
            arr1.btn3.visible = item.type == 2 ? true : false;
            arr1.msg.text = item.msg;
            arr1.msg.color = item.color;
            this.diaLogMask.visible = true;
            this.diaLog.show();
            arr1.btn1.on(Laya.Event.CLICK, this, () => {
                if (item.comfirmFn)
                    item.comfirmFn('点击了确定按钮');
                this.closeDiaLog();
            })
            arr1.btn2.on(Laya.Event.CLICK, this, () => {
                if (item.cancelFn)
                    item.cancelFn('点击了取消按钮');
                this.closeDiaLog();
            })
            arr1.btn3.on(Laya.Event.CLICK, this, () => {
                if (item.comfirmFn)
                    item.comfirmFn('点击了确定按钮');
                this.closeDiaLog();
            })
            this.diaLogMask.on(Laya.Event.CLICK, this, () => {
                if (item.cancelFn)
                    item.cancelFn('点击了取消按钮');
                this.closeDiaLog();
            })
        })
        this.diaLogArr2 = [];
    }

    /**
     * 对话框
     * @param {*} msg 提示内容
     * @param {*} type 显示类型(注意：1--一个确定按钮,2--确定按钮和取消按钮)
     * @param {*} comfirmFn 确认回调
     * @param {*} cancelFn 取消回调
     * @param {*} textColor 文字颜色
     */
    showDiaLog(msg = '', type, comfirmFn, cancelFn, textColor) {
        let myMsg = msg ? msg : '';
        let myType = type ? type : 1;
        let myMsgColor = textColor ? textColor : '#935F13';
        if (this.diaLogArr1.length > 0) {
            this.diaLogArr1.forEach(item => {
                item.btn1.visible = myType == 1 ? true : false;
                item.btn2.visible = myType == 2 ? true : false;
                item.btn3.visible = myType == 2 ? true : false;
                item.msg.text = myMsg;
                item.msg.color = myMsgColor;
                this.diaLogMask.visible = true;
                this.diaLog.show();
                item.btn1.on(Laya.Event.CLICK, this, () => {
                    if (comfirmFn)
                        comfirmFn('点击了确定按钮');
                    this.closeDiaLog();
                })
                item.btn2.on(Laya.Event.CLICK, this, () => {
                    if (cancelFn)
                        cancelFn('点击了取消按钮');
                    this.closeDiaLog();
                })
                item.btn3.on(Laya.Event.CLICK, this, () => {
                    if (comfirmFn)
                        comfirmFn('点击了确定按钮');
                    this.closeDiaLog();
                })
                this.diaLogMask.on(Laya.Event.CLICK, this, () => {
                    if (cancelFn)
                        cancelFn('点击了取消按钮');
                    this.closeDiaLog();
                })
            })
            return;
        } else {
            this.diaLogArr2 = [{ msg: myMsg, type: myType, comfirmFn: comfirmFn, cancelFn: cancelFn, color: myMsgColor }]
        }
    }

    setText(node, size, color) {
        node.fontSize = size;
        node.color = color;
        return node;
    }



    /**
    * 创建加载图标到stage
    * @param type 加载图标类型
    */
    createLoading(type = this.loadingType.one) {
        Laya.loader.load("res/atlas/images/common.atlas", Laya.Handler.create(this, onMyLoaded));
        function onMyLoaded() {
            let loadingMask = new Laya.Image();
            loadingMask.visible = false;
            loadingMask.left = 0;
            loadingMask.top = 0;
            loadingMask.bottom = 0;
            loadingMask.right = 0;
            loadingMask.zOrder = 10;
            loadingMask.name = 'loadingMask-' + type;
            loadingMask.on(Laya.Event.CLICK, this, () => { });
            let animationBox = new Laya.Sprite();
            let animationText = new Laya.Label();
            if (type == this.loadingType.three) {
                animationText.name = 'loadingText';
                animationText.width = 220;
                animationText.centerX = 0;
                animationText.align = 'center';
                animationText.zOrder = 10;
                animationText.bottom = -85;
                let aniText = this.setText(animationText, 30, '#FFFFFF');
                animationBox.addChild(aniText);
            }
            animationBox.name = 'loadingBox';
            animationBox.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            let ani = new Laya.Animation();
            ani.name = 'loadingAni';
            ani.loadAnimation("animation/loading/" + type + ".ani");
            animationBox.addChild(ani);
            loadingMask.addChild(animationBox);
            Laya.stage.addChild(loadingMask);
            this.loadAniArr1.push(type);
            this.loadAniArr2.forEach(item => {
                if (item.key == type) {
                    let $loadingMask = Laya.stage.getChildByName('loadingMask-' + item.type);
                    $loadingMask.visible = item.show;
                    animationText.text = '';
                    if (item.show) {
                        animationText.text = item.text;
                        ani.play();
                    } else {
                        ani.stop();
                    }
                }
            })
        }
    }

    /**
     * 显示或隐藏加载图标
     * @param isShow 是否显示
     * @param type 显示类型
     * @param msg 显示文字
     */
    showLoading(isShow = true, type = this.loadingType.one, msg = '') {
        this.loadAniArr1.forEach(item => {
            if (item == type) {
                let loadingMask = Laya.stage.getChildByName('loadingMask-' + type);
                let loadingBox = loadingMask.getChildByName('loadingBox');
                let loadingAni = loadingBox.getChildByName('loadingAni');
                let loadingText;
                if (type == this.loadingType.three) {
                    loadingText = loadingBox.getChildByName('loadingText');
                    loadingText.text = '';
                }
                if (!loadingMask.visible && isShow) {
                    if (type == this.loadingType.three)
                        loadingText.text = msg;
                    loadingAni.play();
                } else if (!isShow) {
                    loadingAni.stop();
                }
                loadingMask.visible = isShow;
                return;
            }
        })
        this.loadAniArr2 = [{ key: type, show: isShow, type: type, text: msg }];
    }

    /**
     * 隐藏所有的加载
     */
    hideAllLoading() {
        this.showLoading(false, this.loadingType.one);
        this.showLoading(false, this.loadingType.two);
        this.showLoading(false, this.loadingType.three);
    }


    /**
     * 加载图片资源,判断加载失败则显示默认图片(默认图片分多种，根据需要)
     * @param {*} node 加载图片的节点
     * @param {*} url 加载图片资源地址
     * @param {*} type 默认的图片类型 
     * @param {*} type2 加载图片方式  skin 和 loadImage两种方式 
     */
    $LoadImage(node, url = '', type = this.defaultImg.one, type2 = 'loadImage') {
        if (url.indexOf('.png') != -1 || url.indexOf('.jpg') != -1 || url.indexOf('.jpeg') != -1) {
            Laya.loader.load(url, Laya.Handler.create(this, (res) => {
                if (res) {
                    if (type2 == 'loadImage') {
                        node.loadImage(url);
                    } else if (type2 == 'skin') {
                        node.skin = url;
                    }
                } else {
                    if (type2 == 'loadImage') {
                        node.loadImage(type);
                    } else if (type2 == 'skin') {
                        node.skin = type;
                    }
                }
            }))
        } else {
            if (type2 == 'loadImage') {
                node.loadImage(type);
            } else if (type2 == 'skin') {
                node.skin = type;
            }
        }
    }

    /**
     * 滑动选择
     * @param slider_box_node 需要将内容添加到该盒子里面的节点
     * @param slider_btn_node 滑动按钮资源节点
     * @param that 执行域
     * @param fn 回调函数
     */
    $slider(slider_box_node, slider_btn_node, that, fn) {
        slider_btn_node.x = 0;
        slider_btn_node.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [slider_box_node, slider_btn_node, that, fn]);
    }
    /**
     * 接上
     */
    onMouseDown(slider_box_node, slider_btn_node, that, fn) {
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove, [slider_box_node, slider_btn_node, that, fn]);
        slider_btn_node.x = slider_btn_node.x;
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    }
    /**
    * 移动事件
    */
    onMouseMove(slider_box_node, slider_btn_node, that, fn) {
        slider_btn_node.x = Math.max(Math.min(slider_box_node.mouseX, slider_box_node.width), 0);
        if (fn)
            fn.call(that, slider_btn_node.x)
    }

    onMouseUp() {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    }

    /**
     * switch开关
     * @param {*} switchBox 装两个按钮的盒子
     * @param {*} isSelected 是否开启
     * @param {*} that 执行域
     * @param {*} fn 回调函数，返回是否开启
     */
    $switch(switchBox, isSelected, that, fn) {
        let isSelect = isSelected == 1 ? true : false;
        let switch0 = switchBox.getChildByName("switch0");
        let switch1 = switchBox.getChildByName("switch1");
        switch0.visible = isSelect ? false : true;
        switch1.visible = isSelect ? true : false;
        switchBox.on(Laya.Event.CLICK, this, () => {
            switch0.visible = switch1.visible;
            switch1.visible = !switch0.visible;
            if (switch1.visible && fn)
                fn.call(that, true);
            else if (switch0.visible && fn) {
                fn.call(that, false);
            }
        })
    }

    /**
     *  预加载的资源 
     * @param that 执行域
     * @param loadFn 加载完成回调
     */
    beforeLoadScene(that, loadFn) {
        this.beforeLoadThat = that;
        this.beforeLoadCallback = loadFn;
        Laya.loader.load([this.gameView.desk_bg1, this.gameView.desk_bg2]);
        //加载所有的牌
        this.gamePoker.forEach(item => {
            Laya.loader.load('res/img/poker/' + item + '.png');
        })
        this.loadScene.forEach(item => {
            Laya.Scene.load(item, Laya.Handler.create(this, this.openView));
        })
    }

    /**
     * 加载资源回调
     * @param {*} res 加载资源结束回调参数
     */
    openView(res) {
        this.beforeLoadCallback.call(this.beforeLoadThat, res);
        this.$LOG('预加载的资源：', res);
        this.loadSceneResourcesArr.push(res.url);
        this.openSceneViewArr.forEach((item, index) => {
            if (item.url.indexOf(res.url) != -1) {
                // console.log('Main中正在打开==================0000')
                Laya.Scene.open(res.url, item.closeOther, item.data, Laya.Handler.create(this, item.fn), () => {
                    console.log('Main中正在打开==================1')
                });
                this.openSceneViewArr.splice(index, 1);
                return;
            }
        })
    }

    /**
     * 打开场景
     * @param url 场景地址
     * @param closeOther 是否关闭
     * @param data 参数
     * @param fn 打开回调函数
     * @param fn2 正在打开回调函数
     */
    $openScene(url, closeOther = true, data = null, fn, fn2) {
        this.loadSceneResourcesArr.forEach(item => {
            if (item.indexOf(url) != -1) {
                Laya.Scene.open(url, closeOther, data, Laya.Handler.create(this, fn), Laya.Handler.create(this, () => {
                    console.log('Main中正在打开==================2')
                }));
                return;
            }
        })
        this.openSceneViewArr = [{ url: url, closeOther: closeOther, data: data, fn: fn, fn2: fn2 }];
    }

    /**
     * 将秒转化为时分秒
     */
    secondToDate(result) {
        var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return result = h + ":" + m + ":" + s;
    }




    /**
 * 格式化时间
 * @timeVal new Date 格式的时间
 * @typeStr 分割符号 例：'/'  '.'  '-'
 */
    getFormatTime(timeVal) {
        if (timeVal != null) {
            let date = new Date(timeVal);
            let nowY = date.getFullYear();
            let nowM = date.getMonth() + 1;
            let nowD = date.getDate();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let result = {
                nowY: nowY,
                month: (nowM < 10 ? "0" + nowM : nowM),
                day: (nowD < 10 ? "0" + nowD : nowD),
                hour: (hour < 10 ? "0" + hour : hour),
                minutes: (minutes < 10 ? "0" + minutes : minutes),
                timeStr: nowY + '-' + nowM + '-' + nowD
            }
            return result;
        } else {
            return null;
        }
    }
}
export default new Main();
