import R from 'ramda';

import data from '../dataTiles.json';

import { 
    NEW_GAME, 
    FLIP_TO_BACK,
    TILES_MATCHED
} from '../types';

import { 
    guid,
    shuffle,
    duplicateEl,
    prepareGridData,
    addTrapBasedOnLevelChosen
} from '../lib';
  
export default (function(){
    const _actions = {
        [NEW_GAME]: (tiles, { gridSize, lvl }) => 
            R.compose(
                shuffle,
                duplicateEl(guid),
                addTrapBasedOnLevelChosen(lvl)
            )( prepareGridData(lvl, gridSize, data["grid"]) )
        ,

        [TILES_MATCHED]: (tiles, action) => { // TODO: To be refactored
            return tiles.reduce((acc, tile) => {
                if(tile.src === action.src) tile.isMatched = true;
                acc.push(tile);
                return acc;
            }, []);
        },

        [FLIP_TO_BACK]: (tiles, { memoryTiles }) => {
            const findIndex  = idx => R.findIndex(R.propEq('id', idx))(tiles),
                  firstIdx   = findIndex(memoryTiles[0].id),
                  secondIdx  = findIndex(memoryTiles[1].id);

            return R.compose(
                R.update(secondIdx, Object.assign({}, tiles[secondIdx], { isFlipped: false })),
                R.update
            )(firstIdx, Object.assign({}, tiles[firstIdx], { isFlipped: false }), tiles);
        }
    };

    function execute(actionType){
        const _slice = Array.prototype.slice;
        return _actions[actionType].apply(null, _slice.call(arguments, 1));
    }

    return (tiles=[], action) => {

        if(action.type === NEW_GAME)
            return execute(NEW_GAME, tiles, action);
        
        if(action.type === TILES_MATCHED)
            return execute(TILES_MATCHED, tiles, action);

        if(action.type === FLIP_TO_BACK)
            return execute(FLIP_TO_BACK, tiles, action);
        
        return tiles;
    };
}());