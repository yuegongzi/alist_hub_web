import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} AList Hub`}
      links={[
        {
          key: 'AList Hub',
          title: 'AList Hub',
          href: 'https://github.com/yuegongzi/alist_hub',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/yuegongzi/alist_hub',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
