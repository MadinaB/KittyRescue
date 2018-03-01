import {
    NEW_GAME, 
    FLIP_TO_BACK,
    DECREASE_TIME,
    INVALIDATE_TIMER
} from "../types";

import { timerLvls } from "../globals";

interface ITimerOptions {
    time: number;
    hasGameStarted: boolean;
    invalidateTimer: string;
}

interface IAction {
    type: string;
    gridSize: number;
    lvl: string;
    msg: string;
    memoryTiles: any[];
}

const initialTimerOptions = {
    time: null,
    hasGameStarted: null,
    invalidateTimer: null
};

export default (timerOptions: ITimerOptions = initialTimerOptions, action: IAction) => {

    if(action.type === NEW_GAME)
        return {
            time: timerLvls[action.gridSize][action.lvl],
            hasGameStarted: false
        };

    if(action.type === DECREASE_TIME)
        return Object.assign({}, timerOptions, {
            time: timerOptions.time - 1
        });
    
    if(action.type === INVALIDATE_TIMER)
        return Object.assign({}, timerOptions, {
            invalidateTimer: action.msg
        });
    
    if(action.type === FLIP_TO_BACK){
        const traps = action.memoryTiles.find( tile => tile.isTrap );

        if(!!traps && timerOptions.time > 0 && timerOptions.hasGameStarted) {
            return Object.assign({}, timerOptions, {
                time: timerOptions.time - 3 >= 0 ? timerOptions.time -=3 : 0
            });
        }

        return Object.assign({}, timerOptions, {
            hasGameStarted: true
        });
    }

    return timerOptions;
}