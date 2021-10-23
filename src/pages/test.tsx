import { GetServerSideProps, NextPage } from 'next'
interface testProps {
  ua: string
}

const test: NextPage<testProps> = ( { ua } ) => {
  return <div>{ua}</div>
}

export const getServerSideProps: GetServerSideProps = async ( { req, params } ) => {
  const ua = req ? req.headers['user-agent'] : navigator.userAgent
  return { props: { ua } }
}
export default test
