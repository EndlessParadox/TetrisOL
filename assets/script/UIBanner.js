// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        btnMic:cc.Button,
        btnMicMute:cc.Button,
        btnBgm:cc.Button,
        btmBgmMute:cc.Button,
        btnSe:cc.Button,
        btnSeMute:cc.Button,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.btnMic.node.on('click', function()
        {
            this.btnMic.node.active = false;
            this.btnMicMute.node.active = true;
        },this);
        this.btnMicMute.node.on('click', function()
        {
            this.btnMic.node.active = true;
            this.btnMicMute.node.active = false;
        },this);
        this.btnBgm.node.on('click', function()
        {
            this.btnBgm.node.active = false;
            this.btmBgmMute.node.active = true;
        },this);
        this.btmBgmMute.node.on('click', function()
        {
            this.btnBgm.node.active = true;
            this.btmBgmMute.node.active = false;
        },this);
        this.btnSe.node.on('click', function()
        {
            this.btnSe.node.active = false;
            this.btnSeMute.node.active = true;
        },this);
        this.btnSeMute.node.on('click', function()
        {
            this.btnSe.node.active = true;
            this.btnSeMute.node.active = false;
        },this);
    },

    // update (dt) {},
});
