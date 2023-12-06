
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SubDepartmentsList from './SubDepartmentsList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];


  const departmentsData = [
    {
      "department": "customer_service",
      "sub_departments": [
        "support",
        "customer_success"
      ]
    },
    {
      "department": "design",
      "sub_departments": [
        "graphic_design",
        "product_design",
        "web_design"
      ]
    }
  ];
  
  return (
    <div className='second'>
        <div className='grid'>
      <DataGrid className=''
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
    <div className="list">
    <SubDepartmentsList  departments={departmentsData} />
    </div>
    
    </div>
  );
};

export default SecondPage;
