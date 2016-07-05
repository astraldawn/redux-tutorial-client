/**
 * Created by mark on 7/5/16.
 */
export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function vote(entry) {
    return {
        type: 'VOTE',
        entry
    };
}