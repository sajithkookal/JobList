import styles from './Style.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

export const Listing = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [skills, setSkills] = useState([])
    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {    
        if (search.length > 0) {
            const arr = jobs.filter((job)=>{
                if (job?.position?.toLowerCase().includes(search.toLowerCase())){
                    return job;
                }
            });
            console.log(arr)
            setJobs([...arr])
        }
        else {
            const options = { method: 'GET' };
            const search = skills.join("&")
    
        const encodedSkills = encodeURIComponent(search);
            fetch(`https://job-seeker-zbzl.onrender.com/api/job/job-posts?skillsRequired=${encodedSkills}`, options)
                .then(response => response.json())
                .then(response => setJobs([...response.jobPosts]))
                .catch(err => console.error(err));
        }
    }, [search])

    const handleSkill = (e) => {
        if (e.target.value ==="")
        return;
        if (!skills.includes(e.target.value))
            setSkills((prev) => [...prev, e.target.value])
    }

    const handleRemove = (skill) => {
        const index = skills.indexOf(skill)
        skills.splice(index, 1)
        setSkills([...skills])
    }
    useEffect(() => {
        const options = { method: 'GET' };
        const search = skills.join("&")
        console.log(search," search");
        const encodedSkills = encodeURIComponent(search);
        fetch(`https://job-seeker-zbzl.onrender.com/api/job/job-posts?skillsRequired=${encodedSkills}`, options)
            .then(response => response.json())
            .then(response => setJobs([...response.jobPosts]))
            .catch(err => console.error(err));
    }, [skills])
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.containerTop}>
                    <IoSearch size="1.5vw" color="grey" />
                    <input className={styles.inputTop} value={search} onChange={handleSearch} type="text" name='search' placeholder='Type any job title' />
                </div>
                <div className={styles.containerBottom}>
                    <div>
                        <select onClick={handleSkill} className={styles.inputSelect} name="remote">
                            <option value="">Skills</option>
                            {codingSkills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                        {skills.map((skill) => {
                            return (
                                <span className={styles.chip} key={skill}>{skill}<span onClick={() => handleRemove(skill)} className={styles.cross}>X</span></span>
                            )
                        }
                        )}
                    </div>
                    <button onClick={() => navigate("/addJob", { state: { id: jobs._id } })} className={styles.view}>Add Job</button>
                </div>
            </div>
            <div className={styles.bottom}>
                {jobs.map((data) => {
                    return (
                        <div key={data._id} className={styles.list}>
                            <div className={styles.listLeft}>
                                <div>
                                    <img src={data.logoURL} />
                                </div>
                                <div className={styles.infoLeft}>
                                    <p className={styles.position}>{data.position}</p>
                                    <p className={styles.extraInfo}>
                                        <span className={styles.greyText}>11-50</span>
                                        <span className={styles.greyText}>₹ {data.salary}</span>
                                        <span className={styles.greyText}>{data.location}</span>
                                    </p>
                                    <p className={styles.extraInfo}>
                                        <span className={styles.redText}>{data.remote}</span>
                                        <span className={styles.redText}>{data.jobType}</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {data.skillsRequired.map((skill) => {
                                        return (
                                            <span className={styles.skill} key={skill}>{skill}</span>
                                        )
                                    }
                                    )}
                                </div>
                                <div className={styles.btnGroup}>
                                    <button onClick={() => navigate('/addJob', { state: { id: data._id, edit: true } })} className={styles.edit}>Edit job</button>
                                    <button onClick={() => navigate('/detail', { state: { id: data._id } })} className={styles.view}>View Details</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



const codingSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'PHP',
    'Swift',
    'Objective-C',
    'SQL',
    'HTML',
    'CSS',
    'css',
    "node",
    "Flutter",
    "react"
];