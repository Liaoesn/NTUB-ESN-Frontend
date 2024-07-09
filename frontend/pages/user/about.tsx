import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/user/about.module.scss'

export default function about() {
  return (
    <Layout>
      <main className={styles.main}>
        <div>
            <img></img>
            <div>
                <p>使用者名稱：</p>
                <p>ESN</p>
            </div>
        </div>
      </main>
    </Layout>
  );
}