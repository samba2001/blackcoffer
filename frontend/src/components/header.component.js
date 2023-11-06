import { useParams,useLocation } from "react-router-dom";
import React, { useEffect,useState } from 'react';

const Header =(props)=>{
    const {reportType} = useParams()
    const [sideHeading,setSideHeading] = useState('')
    const location = useLocation();

    useEffect(() => {
        const heading = location.pathname.split('/')[1];
      console.log('URL has changed:', heading);
      setSideHeading(heading)
    }, [location.pathname]);

    if( reportType === 'reports' ){
        sideHeading = 'Reports'
    }
    return (
        <div className="d-flex flex-column" style={{backgroundColor:'#10284A', width:"100%"}}>
            <h1 className="text-center text-light my-2"> Black Coffer</h1>
            <h3 className="text-left  text-light mx-4">&nbsp;{sideHeading}</h3>
        </div>
    )


}
export default Header