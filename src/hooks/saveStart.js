let state = {
    "Feed": {},
    "Saved": {}
}

export const saveState = (component, object) => {
    
    state[component] = object
    
}

export const getState = (component) => {
    
    return state[component]
    
}