import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from '../utils/getAppProps';

export default function TokenTopUp() {
  const handleClick = async () => {
    const result = await fetch(`/api/addToken`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('result', json);
    window.location.href = json.session.url;
  };
  return (
    <div>
      <div className='justify-center overflow-hidden items-center flex flex-col mx-20'>
        <h1>Buy tokens</h1>
        <div className=''>10 tokens</div>
        <button className='btn' onClick={handleClick}>
          Add tokens
        </button>
      </div>
    </div>
  );
}
TokenTopUp.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
