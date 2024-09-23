import router from 'next/router';
import projectInterface from '../../type/projectinterface';
import styles from '@/styles/page/project/list.module.scss';

interface proProps {
    project: projectInterface;
}

function Project({ project }: proProps) {
    const edate = new Date(project.enddate);
    return (
        <div onClick={() => router.push(`/project/${project.prono}`)} className={styles.projectMain}>
            <div className={styles.projectItem}>
                <article>
                    <div className={styles.projectLogo}>
                        <p>{project.prono_prefix}</p>
                    </div>
                    <div className={styles.projectContent}>
                        <b>{project.proname}</b>
                        <p>專案建立者: <span>{project.username}</span></p>
                        <p>排序進度: {project.state}</p>
                    </div>
                </article>
                <div className={styles.projectTime}>
                    <p>結案日期：{formatDate(edate)}</p>
                </div>
            </div>
        </div>
    );
}

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
export default Project;
