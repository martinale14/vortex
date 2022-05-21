/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Table.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import SprintCard from '../sprintCard/SprintCard';
import StoryCard from '../storyCard/StoryCard';
import { useEffect, useState } from 'react';
import { GET_ALL_COMPANIES } from '../../utils/url_utils';
import ProjectModal from '../projectModal/projectModal';
import CompanyModal from '../companyModal/CompanyModal';
import SprintModal from '../sprintModal/SprintModal';
import StoryModal from '../storyModal/StoryModal';
import TableService from './TableService';
import { FaHome } from 'react-icons/fa';
import TableTitle from '../tableTitle/TableTitle';
import { MdBusiness, MdArrowRight, MdLibraryAddCheck } from 'react-icons/md';
import { HiPresentationChartLine } from 'react-icons/hi';
import { IoReload } from 'react-icons/io5';

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

function Table(_: propsTable) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [projects, setProjects] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [stories, setStories] = useState([]);

  const [addProject, setAddProject] = useState(false);
  const [addCompany, setAddCompany] = useState(false);
  const [addSprint, setAddSprint] = useState(false);
  const [addStory, setAddStory] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<number>(-1);
  const [selectedProject, setSelectedProject] = useState<number>(-1);
  const [selectedSprint, setSelectedSprint] = useState<number>(-1);

  const PATH = 'https://ana-hu-backend.herokuapp.com/api/v1';

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    setActive();
  }, [selectedCompany, selectedProject, selectedSprint]);

  const fetchCompanies = async () => {
    const data = await TableService.fetchCompanies();
    setCompanies(data);
  };

  const fetchProjects = async (company: VortexObject) => {
    const data = await TableService.fetchProjects(company.id.toString());
    setStories([]);
    setSprints([]);
    setProjects(data);
  };

  const fetchSprints = async (project: VortexObject) => {
    const data = await TableService.fetchSprints(project.id.toString());
    setStories([]);
    setSprints(data);
  };

  const fetchHistories = async (sprint: Sprint) => {
    const data = await TableService.fetchUserHistories(sprint.id.toString());
    setStories(data);
  };

  const setActive = () => {
    const elements = document.getElementsByClassName('table_column');

    let exclude: [number, number] = [-1, -1];

    if (selectedCompany === -1 && selectedProject === -1 && selectedSprint === -1) {
      exclude = [0, 4];
    } else if (selectedCompany !== -1 && selectedProject === -1 && selectedSprint === -1) {
      exclude = [1, 5];
    } else if (selectedCompany !== -1 && selectedProject !== -1 && selectedSprint === -1) {
      exclude = [2, 6];
    } else {
      exclude = [3, 7];
    }

    for (let i = 0; i < elements.length; i++) {
      console.log(exclude.includes(i));

      if (exclude.includes(i)) {
        elements[i].classList.toggle(styles.hidden, false);
      } else {
        elements[i].classList.toggle(styles.hidden, true);
      }
    }
  };

  return (
    <>
      <table className={styles.vortex_table}>
        <thead>
          <tr className={`${styles.vortex_table_title}`}>
            <th className={`${styles.vortex_thead} ${styles.vortex_last}`} colSpan={4}>
              <div className={styles.vortex_table_head_container}>
                <div>
                  <FaHome color='#ff9312' size={25} />
                  <MdArrowRight color='#ff9312' size={25} />
                  <TableTitle
                    onClick={() => {
                      setSelectedCompany(-1);
                      setSelectedProject(-1);
                      setSelectedSprint(-1);
                    }}
                    iconType={MdBusiness}
                    title='Empresas'
                  />
                  {selectedCompany !== -1 ? (
                    <>
                      <MdArrowRight color='#ff9312' size={25} />
                      <TableTitle
                        onClick={() => {
                          setSelectedProject(-1);
                          setSelectedSprint(-1);
                        }}
                        iconType={HiPresentationChartLine}
                        title='Proyectos'
                      />
                    </>
                  ) : null}
                  {selectedProject !== -1 ? (
                    <>
                      <MdArrowRight color='#ff9312' size={25} />
                      <TableTitle
                        onClick={() => {
                          setSelectedSprint(-1);
                        }}
                        iconType={IoReload}
                        title='Sprints'
                      />
                    </>
                  ) : null}
                </div>
                <div className={styles.vortex_table_actions}></div>
              </div>
            </th>
          </tr>
          <tr className={`${styles.vortex_th1} `}>
            <th className={`${styles.vortex_th1} table_column`}>
              <div className={styles.vortex_table_head_container}>
                <TableTitle color='#008f82' iconType={MdBusiness} title='Empresas' />
                <div>
                  <AiFillPlusCircle
                    onClick={() => {
                      setAddCompany(true);
                    }}
                    className={styles.vortex_add_icon}
                  />
                </div>
              </div>
            </th>
            <th className={`${styles.vortex_th1} table_column`}>
              <div className={styles.vortex_table_head_container}>
                <TableTitle color='#008f82' iconType={HiPresentationChartLine} title='Proyectos' />
                <div>
                  <AiFillPlusCircle
                    onClick={() => {
                      setAddProject(true);
                    }}
                    className={styles.vortex_add_icon}
                  />
                </div>
              </div>
            </th>
            <th className={`${styles.vortex_th1} table_column`}>
              <div className={styles.vortex_table_head_container}>
                <TableTitle color='#008f82' iconType={IoReload} title='Sprints' />
                <div>
                  <AiFillPlusCircle
                    onClick={() => {
                      setAddSprint(true);
                    }}
                    className={styles.vortex_add_icon}
                  />
                </div>
              </div>
            </th>
            <th className={`${styles.vortex_last} table_column`}>
              <div className={styles.vortex_table_head_container}>
                <TableTitle color='#008f82' iconType={MdLibraryAddCheck} title='Historias de Usuario' />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.vortex_table_body}>
            <td className={`${styles.vortex_table_body_one} table_column`}>
              {companies.map((company: VortexObject, i) => {
                return (
                  <div
                    key={'company_' + company.id}
                    onClick={() => {
                      fetchProjects(company);
                      setSelectedCompany(company.id);
                      setSelectedProject(-1);
                      setSelectedSprint(-1);
                    }}
                  >
                    <p>{company.name}</p>
                    <IoMdArrowDropright className={styles.arrow} />
                  </div>
                );
              })}
            </td>
            <td className={`${styles.vortex_table_body_one} table_column`}>
              {projects.map((project: VortexObject, i) => {
                return (
                  <div
                    key={'project_' + project.id}
                    onClick={() => {
                      fetchSprints(project);
                      setSelectedProject(project.id);
                      setSelectedSprint(-1);
                    }}
                  >
                    <p>{project.name}</p>
                    <IoMdArrowDropright className={styles.arrow} />
                  </div>
                );
              })}
            </td>
            <td className={`table_column`}>
              <div className={styles.vortex_container}>
                {sprints.map((sprint: Sprint, i) => {
                  return (
                    <SprintCard
                      index={(i + 1).toString()}
                      key={'sprint_' + sprint.id}
                      sprint={sprint}
                      onClick={() => {
                        fetchHistories(sprint);
                        setSelectedSprint(sprint.id);
                      }}
                    />
                  );
                })}
              </div>
            </td>
            <td className={`${styles.vortex_last} table_column`}>
              <div className={styles.vortex_container}>
                {stories.length === 0 && selectedSprint !== -1 ? (
                  <div>
                    <p>No hay historias de usuario para este sprint</p>
                  </div>
                ) : (
                  stories.map((story: any) => {
                    return <StoryCard key={'story_' + story.hist.id} story={story} />;
                  })
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {addProject ? (
        <ProjectModal
          companies={companies}
          onSave={(companyId: any) => {
            fetch(PATH + `project/${companyId}`)
              .then((res) => res.json())
              .then((data) => {
                setSprints([]);
                setStories([]);
                setProjects(data.projects);
              });
          }}
          onClose={() => {
            setAddProject(false);
          }}
        />
      ) : (
        <></>
      )}
      {addCompany ? (
        <CompanyModal
          onSave={() => {
            fetch(GET_ALL_COMPANIES)
              .then((res) => res.json())
              .then((data) => {
                setCompanies(data.companies);
              })
              .catch((error) => console.error(error));
          }}
          onClose={() => {
            setAddCompany(false);
          }}
        />
      ) : (
        <></>
      )}
      {addSprint ? (
        <SprintModal
          projectId={selectedProject}
          onClose={() => {
            setAddSprint(false);
          }}
        />
      ) : (
        <></>
      )}
      {addStory ? (
        <StoryModal
          companies={companies}
          sprintId={selectedSprint}
          onSave={() => {
            setStories([]);
          }}
          onClose={() => {
            setAddStory(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Table;
