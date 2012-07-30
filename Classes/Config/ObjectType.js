var MineType = {
    Rock: {
        big: {
            value: 10,
            weight: 100,
            image: global.theme.big_rock
        },
        small: {
            value: 5,
            weight: 50,
            image: global.theme.small_rock
        }
    },
    
    Gold: {
        big: {
            value: 100,
            weight: 100,
            image: global.theme.big_gold
        },
        middle:{
			value: 100,
			weight:100,
			image:global.theme.middle_gold
		},
        small: {
            value: 50,
            weight: 50,
            image: global.theme.small_gold
        }
    },
    
    Pig: {
        value: 100,
        weight: 50,
        image: global.theme.pig
    },
    
    Diamond: {
        big: {
            value: 1000,
            weight: 100,
            image: global.theme.big_diamond
        },
        small: {
            value: 500,
            weight: 50,
            image: global.theme.small_diamond
        }
    },
    
    Bone: {
        value: 10,
        weight: 40,
        image: global.theme.bone
    },
    
    Bomb: {
        value: 0,
        weight: 0,
        image: global.theme.bomb
    }
};

var ToolType = {
    Milk: {
        create: Milk,
        value: 100,
        image: s_milk
    }, // Make the hook retrieve quicker
    Quick: {
        create: Quick,
        value: 100,
        image: s_milk
    }, // Make the hook rotate quicker
    Lighter: {
        create: Lighter,
        value: 100,
        image: s_milk
    }, // Make the animals ligher
    Sort: {
        create: Sort,
        value: 100,
        image: s_milk
    }, // Sort out the animals
    Longer: {
        create: Longer,
        value: 100,
        image: s_hook_long
    }, // Make the hook longer
    Scan: {
        create: Scan,
        value: 100,
        image: s_milk
    }  // Show a scan line
};

var PropType = {
    Clock: {
        create: Clock,
        image: s_clock
    }, // Make the time longer
    Bone: {
        create: Bone,
        image: s_bone
    }, // Make the dog sleep
    Silent: {
        create: Silent,
        image: s_milk
    }, // Make the dog silent
    Thunder: {
        create: Thunder,
        image: s_milk
    }, // Wake out the animals
    Alarm: {
        create: Alarm,
        image: s_milk
    }, // Wake out the farmer
    Sleep: {
        create: Sleep,
        image: s_milk
    }, // Make the animals sleep
    Bump: {
        create: Bump,
        image: s_milk
    }, // make the hook bumping
    Smaller: {
        create: Smaller,
        image: s_milk
    }, // Make the hook smaller
    Bigger: {
        create: Bigger,
        image: s_milk
    }, // Make the hook bigger
    Frozen: {
        create: Frozen,
        image: s_milk
    }, // Frozen the hook for a given time
    Reverse: {
        create: Reverse,
        image: s_milk
    }, // Reverse the origin launch direction of the hook
    Shift: {
        create: Shift,
        image: s_milk
    }, // Shift the position of the hook
    Rich: {
        create: Rich,
        image: s_rich
    } // Multiply the player's money
};

var getObjectName = function (tag) {
    var name = [
            // MineObjects
            "Rock","Gold","Pig","Diamond","Bone","Bomb",
            // ToolObjects
            "Milk","Quick","Lighter","Sort","Longer","Scan",
            // PropObjects
            "Clock","Silent","Thunder","Alarm",
            "Sleep","Bump","Smaller","Bigger",
            "Frozen","Reverse","Shift","Rich"];
    return name[tag-global.Tag.Rock];
};

var getMineType = function () {
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; ++i) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
    return clone(MineType);
};