import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProjectTable.module.css';
import TableTitle from '../tableTitle/TableTitle';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoBook } from 'react-icons/io5'
import { MdLibraryAddCheck } from 'react-icons/md';
import DetailCard from '../detailCard/DetailCard';
import ProjectTableService from './ProjectTableService';
import StoryDetail from '../storyDetail/StoryDetail';

function ProjectTable(){

    const [addEpic, setAddEpic] = useState(false);
    const [addStory, setAddStory] = useState(false);
    const [epics, setEpics] = useState<any>([]);
    const [stories, setStories] = useState<any>([]);
    const [storiesByEpic, setStoriesByEpic] = useState<any>([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const location = useLocation();

    useEffect(() => {
        initStories();
    },[]);

    const initStories = async () => {
        const projectId = location.pathname.split('/')[3];
        const data = await ProjectTableService.fetchStories(projectId);
        let epicsArr : any = [];
        let storiesArr : any = [];
        
        data.forEach((e: any) => {
            if(e.hist.isEpic === true){
                epicsArr.push(e);
                
            }else{
                storiesArr.push(e);
            }
        });
        setEpics(epicsArr);
        setStories(storiesArr);
    }

    return(
        <>
            <table className={styles.vortex_table}>
                <thead>
                    <tr className={`${styles.vortex_th1} `} >
                        <th className={`${styles.vortex_th1}`}>
                            <div className={styles.vortex_table_head_container}>
                                <TableTitle color='#008f82' iconType={IoBook} title='Épicas' />
                            </div>
                        </th>
                        <th className={`${styles.vortex_th1}`}>
                            <div className={styles.vortex_table_head_container}>
                                <TableTitle color='#008f82' iconType={MdLibraryAddCheck} title='Historias de usuario' />
                            </div>
                        </th>
                        <th className={styles.vortex_last}>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.vortex_table_body}>
                        <td>
                            <div className={styles.vortex_container}>
                                {
                                    epics.map((epic: any) => {
                                        return <DetailCard key={epic.hist.id} title={epic.version.title} 
                                        onClick={() => {
                                            let newStoriesArr: any = [];
                                            setSelectedStory(null)
                                            stories.forEach((story: any) => {
                                                if (story.hist.epicParentId === epic.hist.id) {
                                                    newStoriesArr.push(story);
                                                }
                                            });
                                            setStoriesByEpic(newStoriesArr);
                                        }}/>
                                    })
                                }
                                
                            </div>
                        </td>
                        <td>
                            <div className={styles.vortex_container}>
                                {
                                    storiesByEpic.map((story: any) => {
                                        return <DetailCard key={story.hist.id} title={story.version.title} 
                                        onClick={() => {
                                            setSelectedStory(story);
                                        }}
                                        />
                                    })
                                }
                            </div>
                        </td>
                        <td className={styles.vortex_last}>
                            <div className={styles.vortex_container}>
                                {
                                    selectedStory !== null &&
                                        <StoryDetail key='1' story={selectedStory}/>
                                }
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ProjectTable;