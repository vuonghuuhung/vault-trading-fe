import type { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookie from 'js-cookie';
import { z } from 'zod';

import FormItem from 'components/FormItem';
import TextInput from 'components/FormItem/components/TextInput';

import { ROUTE_URL } from 'constant';

const { Title } = Typography;

type loginProps = {};

type FormValues = {
  username: string;
};

const schema = z.object({
  username: z.string().min(3, { message: 'tối thiểu 3 ký tự' }).max(10, { message: 'tối đa 10 ký tự' }),
});

const Login: FC<loginProps> = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const formContext = useForm<FormValues>({
    defaultValues: {
      username: '',
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = formContext;

  const handleLogin = (data: FormValues) => {
    Cookie.set('authToken', data?.username);
    if (data?.username) {
      navigate(ROUTE_URL.HOME);
    }
  };

  return (
    <div className='login-page star'>
      <Title>Login</Title>

      <FormProvider {...formContext}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormItem name='username' label='Enter the Username' containerClassName='select-item' required>
            <TextInput
              style={{
                width: 500,
              }}
            />
          </FormItem>

          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
