import { Button, Grid, Image, Layout } from 'antd';
import logoName from 'resources/svg/logoName.svg';
import logo from 'resources/svg/logo.svg';
import { Link } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import FormItem from 'components/FormItem';
import SearchInput from 'components/FormItem/components/SearchInput';
import useSearchBar from 'hooks/searchContainer/useSearchBar';
import { menuList } from 'routes';
import MenuDrawer from 'components/MenuDrawer';
import { useGetVaultDetail } from 'store/vault/selector';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const { resetForm, onSubmit, formContext } = useSearchBar<{
    keyword: string;
  }>({
    defaultValue: { keyword: '' },
  });

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // console.log('screens.md', screens.md);

  return (
    <HeaderAntd className='header-container'>
      <div className='start'>
        <div className='logo'>
          <Link to={'/'}>
            <Image src={logoName} preview={false} />
          </Link>
          {screens.md && <div className='divice'></div>}
        </div>
        <div className='menu'>
          {screens.md &&
            menuList.map((item) => {
              return (
                <Link to={item.link} key={item.key} className='menu-item'>
                  <span>{item.text}</span>
                </Link>
              );
            })}
        </div>
      </div>
      <div className='end'>
        {screens.lg && (
          <FormProvider {...formContext}>
            <form autoComplete='off'>
              <FormItem name={'keyword'}>
                <SearchInput
                  className='search-input'
                  onSearch={onSubmit}
                  placeholder={'Search artworks, AI models, prompts, creators, ...'}
                  autoComplete='off'
                />
              </FormItem>
            </form>
          </FormProvider>
        )}
        <Button className='login-btn'>Login</Button>
        {!screens.md && <MenuDrawer />}
      </div>
    </HeaderAntd>
  );
};

export default Header;
