import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import "./taskOptions.css";

export default function TaskOptions(props) {

    const [menuShown, setMenuShown] = useState(false);

    return (
        <div>
            <SlOptionsVertical 
                id="optionsIcon" 
                size={20}
                onMouseOver={()=>{setMenuShown(true)}}
            />
            {menuShown && (
                <div className="optionsMenu" onMouseLeave={()=>{ setMenuShown(false) }}>
                    <span onClick={props.edit}>Editar</span>
                    <span onClick={props.delete}>Deletar</span>
                </div>  
            )}
        </div>
    );
};

