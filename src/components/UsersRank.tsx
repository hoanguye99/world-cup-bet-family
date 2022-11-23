import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { UseQueryResult } from '@tanstack/react-query';
import { UserShort } from '../services/user-matches.services';

interface UsersRankProps {
  getAllUser: UseQueryResult<UserShort[], unknown>
}

function UsersRank(props:UsersRankProps) {
  const {auth} = useContext(AuthContext);
  const [data,setData]= useState<UserShort[] | undefined>(undefined)
    const columns = [
        {
          title : 'Bet thủ',
          dataIndex: 'names',
          key: 'names',
          render: (text:any) => <a>{text}</a>
        },
        { 
          title:"Tích lũy",
          dataIndex: 'score',
          key: 'score',
          render: (text:any) => <a>{text}</a>,
        },
        // {
        //   dataIndex: 'name',
        //   key: 'name',
        //   render: (text:any) => <a>{text}</a>  
        // },
      ];

      // setData(props.getAllUser.data.sort((a:any,b:any)=> b.score - a.score))
      useEffect(() => {
        if (props.getAllUser.data) {
          setData(props.getAllUser.data.sort((a:any,b:any)=> b.score - a.score))
        }
      }, [props.getAllUser.data])
  
  return (
    <div className='container-fifa-rank'>
      <Table columns={columns} dataSource={data}  pagination={false}/>
    </div>
  )
}

export default UsersRank
