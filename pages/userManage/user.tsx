import userInterface from './userInterface';
import styles from '@/styles/page/user/list.module.scss';

interface proProps{
    user: userInterface;
}
function user( {user} : proProps) {
    return (
        <div className={styles.userItem}>
            <article>
                <div className={styles.userLogo}>
                </div>
                <div className={styles.userContent}>
                    <b>{user.username}</b>  
                </div>
                <div className={styles.itemRadius}>
                    <p>{user.permissions}</p>
                </div>    
            </article>
        </div>
    );
}
export default user;
