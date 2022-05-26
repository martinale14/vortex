/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Table.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoMdArrowDropright } from 'react-icons/io';
import SprintCard from '../sprintCard/SprintCard';
import StoryCard from '../storyCard/StoryCard';
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
import Button from '../button/Button';
import ReactLoading from 'react-loading';

interface propsTable {}
interface VortexObject {
  name: string;
  id: number;
}

let epicParent: number | null = null;

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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const fetchProjects = async (companyId: number) => {
    const data = await TableService.fetchProjects(companyId.toString());
    setSelectedProject(-1);
    setSelectedSprint(-1);
    setSprints([]);
    setStories([]);
    setProjects(data);
  };

  const fetchSprints = async (projectId: number) => {
    const data = await TableService.fetchSprints(projectId.toString());
    setSelectedSprint(-1);
    setStories([]);
    setSprints(data);
  };

  const fetchStories = async (sprintId: Number) => {
    setIsLoading(true);
    const data = await TableService.fetchUserStories(sprintId.toString());
    setStories(data);
    setIsLoading(false);
  };

  const selectOption = (e: HTMLDivElement, className: string) => {
    let option = document.getElementsByClassName(className);

    if (option.length > 0) {
      option[0].classList.remove(className, styles.vortex_selected);
    }

    e.classList.add(className, styles.vortex_selected);
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
                      setProjects([]);
                      setSprints([]);
                      setStories([]);
                      let e = document.getElementsByClassName(styles.vortex_selected_company)[0];
                      e.classList.remove(styles.vortex_selected_company, styles.vortex_selected);
                    }}
                    iconType={MdBusiness}
                    title='Empresas'
                  />
                  {selectedCompany !== -1 && (
                    <>
                      <MdArrowRight color='#ff9312' size={25} />
                      <TableTitle
                        onClick={() => {
                          setSelectedProject(-1);
                          setSelectedSprint(-1);
                          setSprints([]);
                          setStories([]);
                          let e = document.getElementsByClassName(styles.vortex_selected_project)[0];
                          e.classList.remove(styles.vortex_selected_project, styles.vortex_selected);
                        }}
                        iconType={HiPresentationChartLine}
                        title='Proyectos'
                      />
                    </>
                  )}
                  {selectedProject !== -1 && (
                    <>
                      <MdArrowRight color='#ff9312' size={25} />
                      <TableTitle
                        onClick={() => {
                          setSelectedSprint(-1);
                          setStories([]);
                        }}
                        iconType={IoReload}
                        title='Sprints'
                      />
                    </>
                  )}
                </div>
                <div className={styles.vortex_table_actions}>
                  <div className={styles.vortex_table_action_one}>
                    <Button
                      disabled={selectedProject !== -1 ? false : true}
                      add
                      noArrow
                      text='Vista detallada del proyecto'
                      onClick={() => {
                        navigate(`/home/project/${selectedProject}`)
                      }}
                    />
                  </div>
                  <div className={styles.vortex_table_action_two}>
                    <Button
                      disabled={selectedSprint !== -1 ? false : true}
                      add
                      noArrow
                      text='Historia de usuario'
                      onClick={() => {
                        setAddStory(true);
                      }}
                    />
                  </div>
                </div>
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
                  {selectedCompany !== -1 && (
                    <AiFillPlusCircle
                      onClick={() => {
                        setAddProject(true);
                      }}
                      className={styles.vortex_add_icon}
                    />
                  )}
                </div>
              </div>
            </th>
            <th className={`${styles.vortex_th1} table_column`}>
              <div className={styles.vortex_table_head_container}>
                <TableTitle color='#008f82' iconType={IoReload} title='Sprints' />
                <div>
                  {selectedProject !== -1 && (
                    <AiFillPlusCircle
                      onClick={() => {
                        setAddSprint(true);
                      }}
                      className={styles.vortex_add_icon}
                    />
                  )}
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
                    onClick={(e) => {
                      fetchProjects(company.id);
                      setSelectedCompany(company.id);
                      setSelectedProject(-1);
                      setSelectedSprint(-1);
                      selectOption(e.currentTarget, styles.vortex_selected_company);
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
                    onClick={(e) => {
                      fetchSprints(project.id);
                      setSelectedProject(project.id);
                      setSelectedSprint(-1);
                      selectOption(e.currentTarget, styles.vortex_selected_project);
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
                {sprints.map((sprint: any, i) => {
                  return (
                    <SprintCard
                      index={(i + 1).toString()}
                      key={'sprint_' + sprint.id}
                      sprint={sprint}
                      onClick={() => {
                        fetchStories(sprint.id);
                        setSelectedSprint(sprint.id);
                      }}
                    />
                  );
                })}
              </div>
            </td>
            <td className={`${styles.vortex_last} table_column`}>
              <div className={styles.vortex_container}>
                {isLoading ? (
                  <ReactLoading type='spinningBubbles' height='100px' width='100px' color='#008f82' />
                ) : stories.length === 0 && selectedSprint !== -1 ? (
                  <div>
                    <p>No hay historias de usuario para este sprint</p>
                  </div>
                ) : (
                  stories.map((story: any) => {
                    return (
                      <StoryCard
                        onClick={() => {
                          if (story.hist.isEpic) {
                            epicParent = story.hist.id;
                            setAddStory(true);
                          }
                        }}
                        key={'story_' + story.hist.id}
                        story={story}
                      />
                    );
                  })
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {addProject && (
        <ProjectModal
          companyId={selectedCompany}
          onSave={(companyId: number) => {
            fetchProjects(companyId);
          }}
          onClose={() => {
            setAddProject(false);
          }}
        />
      )}

      {addCompany && (
        <CompanyModal
          onSave={() => {
            fetchCompanies();
          }}
          onClose={() => {
            setAddCompany(false);
          }}
        />
      )}

      {addSprint && (
        <SprintModal
          projectId={selectedProject}
          onSave={(projectId: number) => {
            fetchSprints(projectId);
          }}
          onClose={() => {
            setAddSprint(false);
          }}
        />
      )}

      {addStory && (
        <StoryModal
          project={selectedProject}
          sprintId={selectedSprint}
          onSave={() => {
            fetchStories(selectedSprint);
          }}
          epicParent={epicParent}
          onClose={() => {
            epicParent = null;
            setAddStory(false);
          }}
        />
      )}
    </>
  );
}

export default Table;
