import Layout, { Nav } from '../components/page';
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
