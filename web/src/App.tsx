import { useState } from 'react';
import { Layout } from 'antd';
import 'chart.js/auto';
import { FilesProvider, useAuth} from 'Providers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Files } from 'Features';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Login/>
  }

  return (
    <Router>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <Layout.Sider
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo" />
        </Layout.Sider>
        <Layout className="main-layout">
          <Layout.Content className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <FilesProvider>
                    <Files />
                  </FilesProvider>
                }
              />
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
