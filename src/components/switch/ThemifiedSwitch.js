import React, {} from 'react'
import './switch.scss'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

//It is swtich button
//add new

const ThemifiedSwitch = (props) => {
    const ColoredSwitch = withStyles({
        switchBase: {
            color: props.customProps.color,
            '&$checked': {
                color: props.customProps.checkedColor
            },
            '&$checked + $track': {
                backgroundColor: props.customProps.trackColor
            }
        },
        checked: {},
        track: {}
    })(Switch)
    return (
        <>
            <ColoredSwitch
                {...props.standardProps}
            />
        </>
    )
}

export default ThemifiedSwitch