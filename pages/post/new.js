import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppLayout } from '../../components/AppLayout'
import { useState } from 'react'

export default function NewPost() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [postContent, setPostContent] = useState('')

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
    setPostContent(json.post.postContent)
  }

  return (
    <div className='w-screen h-screen overflow-hidden flex justify-center items-center relative'>
      <div className='relative z-10 text-slate-699 px-20 py-5 text-center max-w-screen-sm bg-white rounded-md backdrop-blur-sm'>
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

        <div
          className='max-w-screen-sm p-10'
          dangerouslySetInnerHTML={{ __html: postContent }}
        />
      </div>
    </div>
  )
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  }
})
