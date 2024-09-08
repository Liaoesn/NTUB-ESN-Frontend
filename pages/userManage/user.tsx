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
                    <img src={user.avatar_url} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
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
