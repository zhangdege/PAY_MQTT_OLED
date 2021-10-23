import { GetServerSideProps, NextPage } from 'next'
import { APPID } from '../const/wechatpay'

interface PageProps {

  userAgent: 'alipay' | 'wechatpay' | 'others'
  wepayurl: string
}

const Page: NextPage<PageProps> = () => {
  return <div></div>
}

export const getServerSideProps: GetServerSideProps = async ( { req, query } ) => {
  const { total, userId } = query
  const openid_get_url = encodeURIComponent( 'http://aa.kknd0.cn/wepay' )
  const wepayurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${openid_get_url}&response_type=code&scope=snsapi_base&state=${total + 'xx' + userId
    }#wechat_redirect`
  const ua = req ? req.headers['user-agent']! : navigator.userAgent

  if ( ua.includes( 'Alipay' ) ) {
    return {
      props: { userAgent: 'alipay' },
      redirect: { destination: `/alipay?total_amount=${total}&userId=${userId}` },
    }
  } else if ( ua.includes( 'MicroMessenger' ) ) {
    return { props: { userAgent: 'wechatpay' }, redirect: { destination: wepayurl } }
  }
  return { props: { userAgent: 'others', wepayurl } }
}

export default Page
