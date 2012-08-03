var MissionLayer = cc.Layer.extend({
    _missionView: null,
    _curPos: 500,
    _beginPos: null,
    _missionWidth: 200,
    _isMouseDown: false,
    _missions: 3,
    _begin: null,
    _num: 1,
    _direction: 0,
    
    init:function () {
        var bRet = false;
        if (this._super) {
            winSize = cc.Director.sharedDirector().getWinSize();
            var bg = cc.Sprite.create(s_mission_bg);
            bg.setAnchorPoint(cc.PointZero());
            this.addChild(bg, 0, 1);
            
            var winSize = cc.Director.sharedDirector().getWinSize();
            var sysMenuNormal = cc.Sprite.create(s_exit);
            var sysMenuSelected = cc.Sprite.create(s_exitbig);
            var sysMenuDisabled = cc.Sprite.create(s_exit);
            var sysMenu = cc.MenuItemSprite.create(sysMenuNormal, sysMenuSelected,sysMenuDisabled, this, this.onReturn);
			sysMenu.setScale(2.2);
            var menu = cc.Menu.create(sysMenu, null);
            menu.setScale(0.2);
            menu.setAnchorPoint(cc.ccp(0.0));
            menu.setPosition(cc.ccp(winSize.width - 38, 28));
            this.addChild(menu, global.Tag.Menu, 2);
            
            this._missions = 3;
            this.initMissionView();

            bRet = true;
            this.setIsTouchEnabled(true);
        }
        return bRet;
    },
    
    initMissionView: function () {
        this._missionView = new cc.Layer();
        this._missionView.setAnchorPoint(cc.ccp(0,0));
        var unlock = this._missions;
        for (var i = 0; i < Mission.length; i++) {
            var mis = cc.Sprite.create(Mission[i].image);
            if (i > unlock-1) mis.setOpacity(0.8);
            this._missionView.addChild(mis);
            mis.setPosition(cc.ccp(i*(this._missionWidth+10),0));
            mis.setScale(0.7);
        }

        this.addChild(this._missionView, 2, 2);
        this._missionView.setContentSize(cc.SizeMake(i*(this._missionWidth+10),100));

        this._begin = winSize.width / 2;
        this._missionView.setPosition(cc.ccp(this._begin, winSize.height / 2));
        
        var s = cc.Sprite.create(s_mission1);
        
        s.setPosition(cc.ccp(winSize.width/2, winSize.height/2));
        this.addChild(s, 1);
        
        var ruler = cc.Sprite.create(s_mission_ruler);
        ruler.setPosition(cc.ccp(winSize.width/2,winSize.height/2+100));
        this.addChild(ruler,10);
        ruler.setScale(0.9);
        ruler.setScaleY(0.8);
        
        var singleButton = cc.Sprite.create(s_array1);
        var singleButtonDisabled = cc.Sprite.create(s_array1);
        var singleButtonSelected = cc.Sprite.create(s_array1_big);
        
        var doubleButtonDisabled = cc.Sprite.create(s_array3);
        var doubleButton = cc.Sprite.create(s_array3);
        var doubleButtonSelected = cc.Sprite.create(s_array3_big);
        
        var singleMode = cc.MenuItemSprite.create(singleButton,singleButtonSelected,singleButtonDisabled,this,this.onMissionSelected); 
        singleMode.setPosition(cc.ccp(300,100));

        var doubleMode = cc.MenuItemSprite.create(doubleButton,doubleButtonSelected,doubleButtonDisabled,this,this.onMissionSelected2);
        doubleMode.setPosition(cc.ccp(550,100));

        var menu = cc.Menu.create(singleMode, doubleMode);

        menu.setPosition(cc.ccp(0, 0));
        this.addChild(menu, 1, 2);
    },
    
    ccTouchesBegan: function (touches, event) {
        if (!this.isMouseDown) {
            this._beginPos = touches[0].locationInView(0).x;
        }
        this.isMouseDown = true;
    },
    
    ccTouchesMoved: function (touches, event) {
        if (this.isMouseDown) {
            var touchLocation = touches[0].locationInView(0).x;
            var nMoveX = touchLocation - this._beginPos;
            this._curPos = this._missionView.getPosition();

            var nextPos = cc.ccp(this._curPos.x + nMoveX, this._curPos.y);

            this._missionView.setPosition(nextPos);
            this._beginPos = touchLocation;
            this._curPos = nextPos;
            this._direction = touches[0].locationInView(0).x - touches[0].previousLocationInView(0).x;
        }
    },
    
    ccTouchesEnded: function (touches, event) {
        if (this._direction < 0) {
            this._num = Math.ceil(Math.abs(this._curPos.x - this._begin) / (this._missionWidth + 10))+1;
        } else {
            this._num = Math.ceil(Math.abs(this._curPos.x - this._begin) / (this._missionWidth + 10));
        }
        if (this._num > 3) this._num = 3;
        if (typeof (this._direction) == "undefined") {
            this._num = Math.ceil(Math.abs(this._curPos.x - this._begin) / (this._missionWidth + 10));
            this.isMouseDown = false;
            return;
        }
        this.moveToMission(this._num);
        this.isMouseDown = false;
        Game.difficulty = this._num;
        if(Game.difficulty == 1){
            Game.Speed.rotate = 2;
        }
        else if(Game.difficulty == 2){
            Game.Speed.rotate = 1;
        }
        else{
            Game.Speed.rotate = 0.8;
        }
    },
    
    moveToMission: function (num) {
        if (num > NUMBER_OF_MISSIONS) num = NUMBER_OF_MISSIONS;
        var end = this._begin - (num - 1)* (this._missionWidth + 10);
        var action = cc.MoveTo.create(0.1, cc.ccp(end, winSize.height/2));
        this._missionView.runAction(action);
    },
    
    onMissionSelected: function () {
        Game.resume();
        Game.mission = this._num;
        var scene = cc.Scene.create();
        scene.addChild(singleGameLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    },
    
    onMissionSelected2: function () {
        Game.gameMode = 2;
        Game.resume();
        Game.mission = this._num;   
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        scene.addChild(GameControlMenu.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2,scene));
    },
    
    showIndication: function () {
        // Indicate the use that the mission is
        // not unlocked. and counts needed to
        // unlock it.
        console.log("Indication");
    },
    onReturn:function () {
        var scene = cc.Scene.create();
        scene.addChild(StartLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(0.7,scene));
		//this.getParent().removeChild(this);
    }
});

MissionLayer.create = function () {
    var sg = new MissionLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MissionLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MissionLayer.create();
    scene.addChild(layer);
    return scene;
};
