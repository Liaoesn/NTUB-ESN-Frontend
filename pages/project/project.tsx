import projectinterface from './projectinterface'
import styles from '@/styles/page/project/list.module.scss'

interface proProps{
    project: projectinterface;
}
function project(project : proProps) {
    return (
        <div className={styles.projectItem}>
        <article>
        <div className={styles.projectLogo}>
            <p>{project.project.img}</p>
        </div>
        <div className={styles.projectContent}>
            <b>{project.project.tit}</b>
            <p>專案建立者: <span>{project.project.proname}</span></p>
            <p>排序進度: {project.project.state}</p>
        </div>  
        </article>
        <div className={styles.projectTime}>
        <p>結案日期：{project.project.enddate}</p>
        </div>
        </div>
    );
}
export default project;
