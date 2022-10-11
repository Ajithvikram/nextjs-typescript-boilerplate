import http from './index';

export const serverSideProps = (param: any, extra: any = {}) => http.handleServerSide(param, extra);
