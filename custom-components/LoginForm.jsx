import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Form } from '@components/common/form/Form';
import './LoginForm.scss';
import Area from '@components/common/Area';

export default function LoginForm({ authUrl, dashboardUrl }) {
  const [error, setError] = React.useState(null);

  const onSuccess = (response) => {
    if (!response.error) {
      window.location.href = dashboardUrl;
    } else {
      setError(response.error.message);
    }
  };

  return (
    <div className="admin-login-form">
      <div className="flex items-center justify-center mb-12">
        <img
          src="/assets/images/lg-logo.png"  // Replace this with your logo path
          alt="LG Logo"
          className="h-16 w-auto" // Adjust size as needed
        />
      </div>
      {error && <div className="text-critical py-4">{error}</div>}
      <Form
        action={authUrl}
        method="POST"
        id="adminLoginForm"
        isJSON
        onSuccess={onSuccess}
        btnText="SIGN IN"
      >
        <Area
          id="adminLoginForm"
          coreComponents={[
            {
              component: {
                default: Field
              },
              props: {
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'Email',
                validationRules: ['notEmpty', 'email']
              },
              sortOrder: 10
            },
            {
              component: {
                default: Field
              },
              props: {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Password',
                validationRules: ['notEmpty']
              },
              sortOrder: 20
            }
          ]}
          noOuter
        />
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
  authUrl: PropTypes.string.isRequired,
  dashboardUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    authUrl: url(routeId: "adminLoginJson")
    dashboardUrl: url(routeId: "dashboard")
  }
`;
