import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../../components/AppLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

export default function NewPost() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch(`/api/generatePost`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ topic, keywords }),
      });

      const json = await response.json();
      console.log('RESULT', json);
      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (e) {
      setGenerating(false);
    }
  };

  return (
    <div className='h-full overflow-hidden'>
      {generating && (
        <div className='text-green-500 flex flex-col h-full w-full justify-center items-center animate-pulse '>
          <FontAwesomeIcon className='text-8xl' icon={faBrain} />
          <h6>Generating...</h6>
        </div>
      )}
      {!generating && (
        <div className='w-full h-full flex flex-col overflow-auto'>
          <form
            className='m-auto w-full max-w-screen-sm p-4 bg-slate-100 rounded-md shadow-xl border border-slate-200 shadow-slate-200 '
            onSubmit={handleSubmit}
          >
            <div>
              <label>
                <strong>Generate a cover letter for:</strong>
              </label>
              <textarea
                className='txtBox'
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={80}
              />
            </div>
            <div>
              <label>
                <strong>Targeting the following keywords:</strong>
              </label>
              <textarea
                className='txtBox'
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={80}
              />
              <small className='block mb-2'>*Separate keywords with coma</small>
            </div>
            <button
              className='btn'
              type='submit'
              disabled={!topic.trim() || !keywords.trim()}
            >
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableTokens) {
      return {
        redirect: {
          destination: '/token-topup',
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
