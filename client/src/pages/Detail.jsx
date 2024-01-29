import { Navbar } from "../Components/Navbar/Navbar"
import { Details } from "../Components/Detail/Detail"

export const Detail = ()=>{
    return(
        <div style={{background:" #FFEFEF",overflowX:"hidden"}}>
            <Navbar/>
            <Details/>
        </div>
    )
}