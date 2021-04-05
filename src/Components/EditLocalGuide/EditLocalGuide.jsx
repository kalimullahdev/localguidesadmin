import React from 'react'
import { useLocation } from "react-router-dom";


export default function EditLocalGuide(props) {
    const location = useLocation();

    return (
        <div>
            <h1>Edit Local Guide</h1>
            {
       console.log(location.state.detail) // result: 'some_value'
    }
        </div>
    )
}
