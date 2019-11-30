class Main {
    constructor() {
        Main.instance = this;
        this.websoketApi = '192.168.0.125:8082';
        this.requestApi = 'http://192.168.0.125:8081';
        // this.websoketApi = '132.232.34.32:8082';
        // this.requestApi = 'http://132.232.34.32:8081';
        this.phoneNews = {
            statusHeight: 0,//手机系统栏的高度
            deviceNews: '',//系统名称：Android / iOS
        }
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.$LOG('Main.js获取用户信息：', this.userInfo);
        this.sign = {
            signOut: 1,
            register: 2,
            changePwd: 3,
            shop: 4
        }
        this.pages = {
            page1: 'NoticePage',
            page2: 'CreateGamePage',
            page3: 'HallPage',
            page4: 'DataPage',
            page5: 'MePage'
        }
        this.gameView = {
            desk_bg1: 'res/img/gameView/desk_bg1.png',
            desk_bg2: 'res/img/gameView/desk_bg2.png'
        }
        this.loadScene = ['cheXuanGame_8.scene', 'register.scene', 'shishizhanji.scene', 'paijuhuigu.scene', 'paijutishi.scene', 'paijutishi.scene', 'tabPage.scene']
        this.allowGameHallSetInterval = false;
        this.allowRequesList = true;
        this.allowHideLoad = false;
        this.defaultImg = {
            one: 'res/img/common/defaultHead.png'
        }

        this.animations = {
            qiao: 'qiao',
            win: 'win'
        }

        this.loadingType = {
            one: 'Loading',
            two: 'Loading2',
        }

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

        this.errList=[];
    }

    $LOG(...data) {
        if (this.debug)
            console.log(...data);
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
        nodeArr.forEach(node => {
            node.top = node.top + this.phoneNews.statusHeight;
            console.log(node.top)
        })
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
     * 弹框
     * @param {string} text 提示内容
     * @param {Number} type 类型(注意：1--一个确定按钮,2--确定按钮和取消按钮)
     * @param {Array} node 需要显示或隐藏的节点
     * @param {Function} comfirmFn 确认回调
     * @param {Function} cancelFn 取消回调
     * @param {String} textColor 文本颜色
     * @param {bool} showNode 在弹框隐藏时，是否隐藏节点
     */
    showDialog(text = '内容为空', type = 1, node = [], comfirmFn = Function, cancelFn = Function, textColor = '#935F13', showNode = true) {

        let myMask = Laya.stage.getChildByName("dialogMask");
        console.log('ji=====', myMask)
        if (myMask) {
            myMask.removeSelf();
        }
        let Mask = new Laya.Sprite();
        Mask.name = 'dialogMask';
        Mask.zOrder = 4;
        Mask.pos(0, 0);
        Mask.size(Laya.stage.width, Laya.stage.height);
        let diaLog = new Laya.Dialog();
        diaLog.zOrder = 5;
        let dialogBg = new Laya.Image();
        let dialogContent = new Laya.Text();
        dialogContent.fontSize = 60;
        if (textColor) {
            dialogContent.color = textColor;
        } else {
            dialogContent.color = '#935F13';
        }
        dialogContent.size(1132, 180);
        dialogContent.align = 'center';
        dialogContent.valign = 'middle';
        dialogContent.y = 250;
        dialogContent.text = text;
        if (type == 1) {
            let btn_one = new Laya.Image();
            btn_one.size(609, 163);
            dialogBg.addChild(btn_one);
            btn_one.loadImage('res/img/diglog/btn_one.png', Laya.Handler.create(this, () => {
                btn_one.pos((1132 - btn_one.width) / 2, 764 - btn_one.height - 60);
                btn_one.on(Laya.Event.CLICK, this, () => {
                    if (comfirmFn)
                        comfirmFn('点击了确定按钮');
                    closeDiaLog();
                    Mask.removeSelf();
                })
            }));
        } else if (type == 2) {
            let btn_cancel = new Laya.Image();
            let btn_comfirm = new Laya.Image();
            btn_cancel.size(460, 163);
            btn_comfirm.size(460, 163);
            dialogBg.addChild(btn_cancel);
            dialogBg.addChild(btn_comfirm);
            btn_cancel.loadImage('res/img/diglog/btn_cancel.png', Laya.Handler.create(this, () => {
                btn_cancel.pos(72, 764 - btn_cancel.height - 60);
                btn_cancel.on(Laya.Event.CLICK, this, () => {
                    if (cancelFn)
                        cancelFn('点击了取消按钮');
                    closeDiaLog();
                    Mask.removeSelf();
                })
            }))
            btn_comfirm.loadImage('res/img/diglog/btn_comfirm.png', Laya.Handler.create(this, () => {
                btn_comfirm.pos(600, 764 - btn_comfirm.height - 60);
                btn_comfirm.on(Laya.Event.CLICK, this, () => {
                    if (comfirmFn)
                        comfirmFn('点击了确定按钮');
                    closeDiaLog();
                    Mask.removeSelf();
                })
            }))
        }
        dialogBg.loadImage('res/img/diglog/bg.png', Laya.Handler.create(this, () => {
            dialogBg.addChild(dialogContent);
        }));
        dialogBg.pos(0, 0);
        diaLog.size(1132, 764);
        diaLog.addChild(dialogBg);
        diaLog.show();
        Laya.stage.addChild(Mask);
        Mask.on(Laya.Event.CLICK, this, () => {
            if (cancelFn)
                cancelFn('点击了取消按钮');
            closeDiaLog();
            Mask.removeSelf();
        })
        if (node)
            node.forEach(item => {
                item.style.display = 'none';
            })

        function closeDiaLog() {
            diaLog.close();
            if (node) {
                if (showNode)
                    node.forEach(item => {
                        item.style.display = 'block';
                    })
            }
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
            animationText.name = 'loadingText';
            animationText.width = 300;
            animationText.centerX = 0;
            animationText.align = 'center';
            animationText.zOrder = 2;
            animationText.bottom = '-150';
            let aniText = this.setText(animationText, 60, '#000000');
            animationBox.addChild(aniText);
            animationBox.name = 'loadingBox';
            animationBox.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            let ani = new Laya.Animation();
            ani.name = 'loadingAni';
            ani.loadAnimation("animation/" + type + ".ani");
            animationBox.addChild(ani);
            loadingMask.addChild(animationBox);
            Laya.stage.addChild(loadingMask)
            this.loadAniArr1.push('LOADING');
            this.loadAniArr2.forEach(item => {
                if (item.key == 'LOADING') {
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
            if (item == 'LOADING') {
                let loadingMask = Laya.stage.getChildByName('loadingMask-' + type);
                let loadingBox = loadingMask.getChildByName('loadingBox');
                let loadingAni = loadingBox.getChildByName('loadingAni');
                let loadingText = loadingBox.getChildByName('loadingText');
                loadingText.text = '';
                if (!loadingMask.visible && isShow) {
                    loadingText.text = msg;
                    loadingAni.play();
                } else if (!isShow) {
                    loadingAni.stop();
                }
                loadingMask.visible = isShow;
                return;
            }
        })
        this.loadAniArr2 = [{ key: 'LOADING', show: isShow, type: type, text: msg }];
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
     */
    beforeLoadScene() {
        Laya.loader.load([this.gameView.desk_bg1, this.gameView.desk_bg2]);
        this.loadScene.forEach(item => {
            Laya.Scene.load(item, Laya.Handler.create(this, this.openView));
        })
    }

    /**
     * 加载资源回调
     * @param {*} res 加载资源结束回调参数
     */
    openView(res) {
        this.$LOG('预加载的资源：', res);
        this.loadSceneResourcesArr.push(res.url);
        this.openSceneViewArr.forEach((item, index) => {
            if (item.url.indexOf(res.url) != -1) {
                console.log('Main中正在打开==================0000')
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
