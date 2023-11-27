import React, { useEffect, useState } from "react";
import "./ToggleSwitch.css"; 

  
const ToggleSwitch = ({label, isChecked, onChange }) => {
    return (
        <div className="">
            <label className="switch-label">{label}</label>
            <label className = "toggleswitch">
                <input 
                    type = "checkbox" 
                    checked = {isChecked} 
                    onChange = {onChange}
                />
                <span className = "slider"/>
            </label>
        </div>
    );
};

export default ToggleSwitch;
