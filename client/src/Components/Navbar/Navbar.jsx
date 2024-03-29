import styles from './Style.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Rectangle2 from "../../assets/Rectangle 2.png";
import Rectangle3 from "../../assets/Rectangle 3.png";
import Rectangle4 from "../../assets/Rectangle 4.png";

export const Navbar = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("user"))
    const handleLogout = () => {
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("name")
        window.localStorage.removeItem("token")
        setIsLoggedIn(!!window.localStorage.getItem("user"))
        navigate("/")
        alert("Logout successfully");
    }
    return (
        <div className={styles.nav}>
            <img src={Rectangle2} alt="rectangle2" className={styles.rectangle2} />
            <img
                src={Rectangle3}
                alt="rectangle3"
                className={styles.rectangle3}
            />
            <img src={Rectangle4} alt="rectangle4" className={styles.rectangle4}/>
            <p className={styles.text}>JobFinder</p>
            <div>
                {isLoggedIn ? <div  className={styles.loggedInText}>
                    <span onClick={handleLogout}>Logout</span>
                    <span style={{marginLeft:"2vw"}}>Hello! Recruiter</span>
                </div> :
                    <div className={styles.reglogdiv}>
                        <button onClick={() => navigate("/login")} className={styles.login}>Login</button>
                        <button onClick={() => navigate("/register")} className={styles.register}>Register</button>
                    </div>
                }
            </div>
        </div>
    )
}