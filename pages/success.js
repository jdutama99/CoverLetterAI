import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from '../utils/getAppProps';
import Link from 'next/link';

export default function Success() {
  const handleClick = async () => {
    await fetch(`/api/addToken`, {
      method: 'POST',
    });
  };
  return (
    <div className='justify-center overflow-hidden items-center flex flex-col mx-20'>
      <h1>Thank you for your purchase</h1>
      <Link href='/post/new' className='btn mt-5 '>
        New Post
      </Link>
    </div>
  );
}
Success.getLayout = function getLayout(page, pageProps) {
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
