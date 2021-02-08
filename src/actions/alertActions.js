import {
    SHOW_ALERT,
    HIDE_ALERT
} from "../types"



// Show alert
export const showAlertAction = alert => {
    return(dispatch) => {
        dispatch(createAlert(alert))
    }
}

const createAlert = alert => ({
    type: SHOW_ALERT,
    payload: alert
})

// Hide alert
export const hideAlertAction = () => {
    return(dispatch) => {
        dispatch(hideAlert())
    }
}

const hideAlert = () => ({
    type: HIDE_ALERT
})