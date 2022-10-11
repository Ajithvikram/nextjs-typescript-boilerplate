import { GetServerSideProps } from 'next'
import { isEmpty } from 'lodash';
import * as actions from '../../shared/api/url-helper';
import Home from '../component/home';
import { safeJSONStringify } from '../../shared/formatting';

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  if (!isEmpty(query)) {
    const { body } = query;
    await actions.serverSideProps({
      path: 'user/',
      query: {},
      context,
      method: 'POST',
    }, { body });
  }
  const userData = await actions.serverSideProps({
    path: 'user',
    query: { orderBy: safeJSONStringify({ key: 'createdAt', sort: 'DESC' }) },
    context,
  });
  return {
    props: {
      userData: userData.data,
    },
  };
};
