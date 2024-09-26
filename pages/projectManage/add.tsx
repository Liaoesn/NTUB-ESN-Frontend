import Layout from '@/components/Layout/Layout';
import styles from '@/styles/page/project/add.module.scss';
import React, { useState, useEffect } from 'react';
import PrivateRoute from '../privateRoute';
import userI from '../../type/userI';
import ProjectName from '@/components/popup/addproject/addName';
import ProjectPeople from '@/components/popup/addproject/addPeople';
import ProjectChoose from '@/components/popup/addproject/addChoose';
import ProjectFile from '@/components/popup/addproject/addFile';
import ProjectTime from '@/components/popup/addproject/addTime';



function CreateProject({ user }: { user: userI | undefined }) {
  const [alignment, setAlignment] = React.useState('web');
  const [files, setFiles] = useState<FileList | null>(null);
  const [filesName, setFilesName] = useState<string>('點擊或拖動文件到這裡上傳');
  const [academic, setAcademic] = React.useState('');
  const [people, setPeople] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  console.log(alignment);
  console.log(filesName);

  return (
    <>
      <main className={styles.coverBg}>
        {/* <ProjectChoose/> */}
        {/* <ProjectFile/> */}
        <ProjectName Alignment={setAlignment} FilesName={()=>setFilesName}/>
        {/* <ProjectTime/> */}
      </main>
    </>
  );
}
export default function Init() {
  const [user, setUser] = useState<userI>();

  return (
    <PrivateRoute>
      <CreateProject user={user} />
    </PrivateRoute>
  );
}