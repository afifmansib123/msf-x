import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
        "&.MuiSelect-select": {
            margin: "7px 0px 15px 0px",
        },
    },
    noUnderline: {
        "&.MuiInput-underline": {
            "&::before": {
                content: "none",
            },
        },
    },
}));

export default function SimpleSelect({
                                         name,
                                         classname,
                                         menulist,
                                         keys,
                                         error,
                                         value,
                                         onChange,
                                         buttonname,
                                         icon,
                                         third,
                                     }) {
    const classes = useStyles();
    return (
        <FormControl
            className={(classes.formControl, classname)}
            style={error && { marginBottom: "0px" }}
            error={error && true}
        >
            <Select
                name={name}
                IconComponent={icon === true ? ArrowDropDownIcon : NavigateNextIcon}
                disableUnderline
                value={value}
                onChange={onChange}
                displayEmpty
                // classes={classes.selectEmpty}
                // MenuProps={classes.selectEmpty}
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
            >
                <MenuItem value="" disabled>
                    {buttonname}
                </MenuItem>
                {menulist.map((l, index) => {
                    return <MenuItem key={index} value={l[keys[0]]}>{l[keys[1]]}</MenuItem>;
                })}
            </Select>
            {error && (
                <FormHelperText style={{ marginTop: "5px", position: "absolute", bottom: "-20px" }}>{error}</FormHelperText>
            )}
        </FormControl>
    );
}
