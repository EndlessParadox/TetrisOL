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
        boards:[cc.Node],
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


     onLoad () {
         var self = this;

         this.node.on('underAttack', function (event) {
             this.attackCallBack(event.getUserData().isAI,event.getUserData().line,event.getUserData().atk);
             event.stopPropagation();
         },this);

         this.node.on('gameOver', function (event) {
             alert(event.getUserData().isAI ? "AI真菜！" : "你好菜啊！");
             this.reset();
             event.stopPropagation();
         },this);

         cc.loader.loadRes('atlas/atlas1', cc.SpriteAtlas, function (error, atlas) {
             self.loadAtlasCallBack(atlas);
         });
     },



    start () {
    },

    loadAtlasCallBack:function(atlas)
    {
        this.atlas = atlas;
        this.shapeList = [];
        for(var n = 0; n < 50; n ++)
        {
            this.shapeList.push(this.createShape(atlas));
        }

        for(var i = 0; i < this.boards.length; i ++)
        {
            var board = this.boards[i].getComponent("MainBoard");
            if(board != null)
            {
                board.startGame(this.shapeList,atlas);
            }
        }
    },

    reset:function(){
        this.shapeList = [];
        for(var n = 0; n < 50; n ++)
        {
            this.shapeList.push(this.createShape(this.atlas));
        }
        for(var i = 0; i < this.boards.length; i ++)
        {
            var board = this.boards[i].getComponent("MainBoard");
            if(board != null)
            {
                board.reset(this.shapeList,this.atlas);
            }
        }
    },

    attackCallBack:function(isAI,line,atk)
    {
        for(var j = 0;j < this.boards.length; j ++)
        {
            var board = this.boards[j].getComponent("MainBoard");
            if(board != null)
            {
                if(board.isAI != isAI)
                {
                    board.underAttack(line,atk);
                }
            }
        }
    },

    createShape:function(atlas) {
        var shapeTypes = [LShape, JShape, IShape, OShape, TShape, SShape, ZShape];
        var colorTypes = ["fangkuai06","fangkuai07", "fangkuai05","fangkuai01","fangkuai02","fangkuai03","fangkuai04"]

        var shapeIdx = Math.floor(Math.random() * 100) % shapeTypes.length;
        var shapePos = Math.floor(Math.random() * 100) % 4;
        //var colorIdx = Math.floor(Math.random() * 100) % colorTypes.length;

        return new shapeTypes[shapeIdx](4, 0, shapePos, colorTypes[shapeIdx],atlas);
    }

    // update (dt) {},
});
