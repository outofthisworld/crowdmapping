

export const theme = (state='light',action) => {
    console.log('running theme reducer')
    switch(action.type){
        case "CHANGE_THEME":
            return action.theme;
        default:
            console.log('returning ', state)
            return state;
    }
}