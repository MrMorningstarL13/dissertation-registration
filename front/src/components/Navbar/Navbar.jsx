import React, { useState } from 'react';
import s from "./Navbar.module.css";
import useUserStore from '../../stores/userStore';
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  QuestionOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const Navbar = ({ formStep, setFormStep }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  const onClick = (e) => {
    console.log('click ', e);
   
      setFormStep(parseInt(e.key));
    
  }
  const isProfessor = useUserStore((state) => state.isProfessor);

  const items = [
    {
      key: 2,
      icon: <DesktopOutlined />,
      label: 'Profile',
    },
    {
      key: 3,
      icon: <PieChartOutlined />,
      label: 'Applications',
    },
    ...(isProfessor
      ? [
        {
          key: 4,
          icon: <ContainerOutlined />,
          label: 'Session', 
        },
      ]
      : []),
    {
      key: 5,
      icon: <QuestionOutlined />,
      label: 'Help',
    },
    {
      key: 6,
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  let menuMode = window.innerWidth < 650 ? 'inline' : 'horizontal';


  return (


    <div className={s.navContainer}>
      {
        (window.innerWidth < 650) ? (<Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >  <MenuUnfoldOutlined /> </Button>) : null
      }


      <Menu id="menu"
        onClick={onClick}
        defaultSelectedKeys={[formStep]}
        selectedKeys={[`${formStep}`]}
        mode={menuMode}
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        style={{
          display: collapsed ? 'none' : 'block',
          fontSize: '1.2rem',
        }}
      />
    </div>
  );
};
export default Navbar;