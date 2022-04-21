import styles from './Table.module.css'
import { AiFillPlusCircle } from 'react-icons/ai'
import { IoMdArrowDropright } from 'react-icons/io'
import SprintCard from '../sprintCard/SprintCard'
import StoryCard from '../storyCard/StoryCard'
import { useEffect, useState } from 'react'

interface propsTable {}
interface VortexObject {
    name: string;
    id: number;
}

interface Sprint {
    id: number;
    startDate: Date;
    endDate: Date;
    status: string;
}

function Table(props: propsTable) {

    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [stories, setStories] = useState([]);
    const PATH = 'https://3c49-186-169-17-198.ngrok.io/api/v1/';

    useEffect(() => {
        if (companies.length <= 0) {
            fetch(PATH + 'company')
                .then(res => res.json())
                .then(data => {
                    setCompanies(data.companies);
                })
                .catch(error => console.error(error));
        }
    });

    /* const fetchProjects: any = (company: VortexObject) => {
        fetch(PATH + `project/${company.id}`)
            .then(res => res.json())
            .then(data => {
                setProjects(data.projects);
            })
    } */

    return (
        <table className={styles.vortex_table}>
            <thead>
                <tr className={styles.vortex_table_head}>
                    <th className={styles.vortex_th1}>
                        <div className={styles.vortex_table_head_container}>
                            <p>Empresas</p>
                            <button className={styles.vortex_add_button}>
                                <AiFillPlusCircle className={styles.vortex_add_icon}/>
                            </button>
                        </div>
                    </th>
                    <th className={styles.vortex_th1}>
                        <div className={styles.vortex_table_head_container}>
                            <p>Proyectos</p>
                            <button className={styles.vortex_add_button}>
                                <AiFillPlusCircle className={styles.vortex_add_icon}/>
                            </button>
                        </div>
                    </th>
                    <th className={styles.vortex_th1}>
                        <div className={styles.vortex_table_head_container}>
                            <p>Sprints</p>
                            <button className={styles.vortex_add_button}>
                                <AiFillPlusCircle className={styles.vortex_add_icon}/>
                            </button>
                        </div>
                    </th>
                    <th className={styles.vortex_last}>
                        <div className={styles.vortex_table_head_container}>
                            <p>Historias de usuario</p>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className={styles.vortex_table_body}>
                    <td className={styles.vortex_table_body_one}>
                        {
                            companies.map((company: VortexObject, i) => {
                                return(
                                    <div key={company.id}
                                        onClick={() => {
                                            fetch(PATH + `project/${company.id}`)
                                                .then(res => res.json())
                                                .then(data => {
                                                    setSprints([]);
                                                    setStories([]);
                                                    setProjects(data.projects);
                                                })
                                        }}
                                    >
                                        <p>{company.name}</p>
                                        <IoMdArrowDropright className={styles.arrow}/>
                                    </div>
                                );
                            })
                        }
                    </td>
                    <td className={styles.vortex_table_body_one}>
                        {
                            projects.map((project: VortexObject, i) => {
                                return(
                                    <div key={project.id}
                                        onClick={() => {
                                            fetch(PATH + `sprint/fromProject/${project.id}`)
                                                .then(res => res.json())
                                                .then(data => {
                                                    setStories([]);
                                                    setSprints(data.sprints);
                                                })
                                        }}
                                    >
                                        <p>{project.name}</p>
                                        <IoMdArrowDropright className={styles.arrow}/>
                                    </div>
                                );
                            })
                        }
                    </td>
                    <td >
                        <div className={styles.vortex_container}>
                            {
                                sprints.map((sprint: Sprint, i) => {
                                    return(
                                        <SprintCard key={sprint.id}
                                            sprint={sprint}
                                            onClick={() => {
                                                fetch(PATH + `history/fromSprint/${sprint.id}`)
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        setStories(data.histories);
                                                    })
                                            }}
                                        />
                                    );
                                })
                            }
                        </div>
                    </td>
                    <td className={styles.vortex_last}>
                        <div className={styles.vortex_container}>
                            {
                                stories.map((story: any, i) => {
                                    return(
                                        <StoryCard key={story.id}
                                            story={story}
                                        />
                                    );
                                })
                            }
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;