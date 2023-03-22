import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import api from '../axios/api';
import Layout, { Nav } from '../components/page';
import { mytoken } from '../redux/modules/quizSlice';
import { cookies } from '../shared/cookie';
import Comment from './Comment';
import DetailContent from './DetailContent';

function Detail() {
  console.log('detail rendering');
  return (
    <>
      <Nav>
        <Layout color="#AE7BC0">
          <DetailContent></DetailContent>
          <Comment />
        </Layout>
      </Nav>
    </>
  );
}

export default Detail;
