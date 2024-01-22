import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppLayout } from '../../components/AppLayout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getAppProps } from '../../utils/getAppProps'

export default function NewPost() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/generatePost`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ topic, keywords }),
    })

    const json = await response.json()
    console.log('RESULT', json)
    if (json?.postId) {
      router.push(`/post/${json.postId}`)
    }
  }

  return (
    <div className='w-screen h-screen overflow-hidden flex justify-center items-center relative'>
      <div className='relative z-10 px-20 py-5 text-center max-w-screen-sm bg-slate-500 rounded-md backdrop-blur-sm'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <strong>Generate a cover letter for:</strong>
            </label>
            <textarea
              className='txtBox'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
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
            />
          </div>
          <button className='btn' type='submit'>
            Generate
          </button>
        </form>
      </div>
    </div>
  )
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx)
    return {
      props,
    }
  },
})
