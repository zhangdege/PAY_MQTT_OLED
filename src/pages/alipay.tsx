import AlipaySdk from 'alipay-sdk'
import crypto from 'crypto'
import fs from 'fs'
import { GetServerSideProps, NextPage } from 'next'
import path from 'path'
interface alipayProps { }

const alipay: NextPage<alipayProps> = () => {
  return <div>123</div>
}

export const getServerSideProps: GetServerSideProps = async ( {
  req,
  params,
  query,
} ) => {
  const alipaySdk = new AlipaySdk( {
    // 参考下方 SDK 配置
    appId: '2021002129666812',
    privateKey: fs.readFileSync(
      path.join( process.cwd(), 'alipaykey', 'private-key.pem' ),
      'ascii'
    ),
    alipayRootCertPath: path.join( process.cwd(), 'alipaykey', 'alipayRootCert.crt' ), //支付宝根证书
    appCertPath: path.join( process.cwd(), 'alipaykey', 'appCertPublicKey.crt' ), //应用公钥证书
    alipayPublicCertPath: path.join(
      process.cwd(),
      'alipaykey',
      'alipayCertPublicKey_RSA2.crt'
    ), //支付宝公钥证书
    encryptKey: 'yclM8tLviGeqLfkP7vR+Vw==',
    camelcase: true,
  } )

  const { total_amount } = query
  const total = parseInt( total_amount as string ) / 100
  const randStr = crypto.randomBytes( 20 ).toString( 'hex' ).slice( -32 ).toUpperCase()
  const timestamp = new Date().toISOString().replace( /T/, ' ' ).replace( /\..+/, '' )
  const notify_url = `http://bb.kknd0.cn/alipaycb`
  const result = await alipaySdk.exec( 'alipay.trade.precreate', {
    timestamp,
    notify_url,
    bizContent: {
      out_trade_no: randStr,
      total_amount: total,
      subject: 'test product1',
    },

    needEncrypt: true,
  } )
  //@ts-ignore
  const { qrCode } = result as { qrCode: string }

  if ( qrCode ) {
    return { props: { qrCode }, redirect: { destination: qrCode } }
  }
  console.log( 'alipay server error' )
  return { props: { qrCode: '/' } }
}
export default alipay
