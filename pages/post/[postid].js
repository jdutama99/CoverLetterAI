import { withPageAuthRequired } from '@auth0/nextjs-auth0'
export default function Home() {
  return (
    <div>
      <h1>home pa</h1>
    </div>
  )
}
export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  }
})
