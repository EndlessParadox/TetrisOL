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

        uiGp:cc.Graphics,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        //this.uiGp.fillRect(0,0,200,200);
        //this.uiGp.rect(0,0,100,100);
        //this.uiGp.strokeColor = cc.color(125,0,0);
        //this.uiGp.stroke();

        this.gameScene = new GameScene();
        this.gameScene.initGame();
        this.gameScene.startGame();
    },

    update (dt) {
        this.gameScene.updateGame();
        this.gameScene.renderGame(this.uiGp);
    },

    //var:GameState = {
    //    STATE_INIT:0,
    //    STATE_STEP:1,
    //    STATE_RUN:2,
    //    STATE_OVER:3
    //},

});
