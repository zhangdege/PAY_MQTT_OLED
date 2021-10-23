import crypto from 'crypto'
import fs from 'fs'
import { GetServerSideProps, NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import path from 'path'
import { useEffect } from 'react'
import { APPID, MCHID, MP_SECRET, SERIAL_NO } from '../const/wechatpay'
interface wpayProps {
  data: any
  userId: string
  total: number
}

const wepay: NextPage<wpayProps> = ( { data, userId, total } ) => {
  const router = useRouter()
  function onBridgeReady() {
    // @ts-ignore
    WeixinJSBridge.invoke( 'getBrandWCPayRequest', data, function ( res ) {
      if ( res.err_msg == 'get_brand_wcpay_request:ok' ) {
        console.log( 'done' )
      } else {
        router.replace( '/success' )
      }
    } )
  }
  useEffect( () => {
    onBridgeReady()
  }, [data] )

  return (
    <div>
      你是{userId} ，你正在支付 {total / 100}元。
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ( { query } ) => {
  const { code, state } = query
  const payInfo = state as string
  const total_userId = payInfo.split( 'xx' )
  const total = parseInt( total_userId[0] )
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${MP_SECRET}&code=${code}&grant_type=authorization_code`
  const res = await fetch( url )
  let data = await res.json()
  const { openid } = data

  if ( openid ) {
    const appTime = Math.round( Date.now() / 1000 ).toString()
    const randStr = crypto.randomBytes( 20 ).toString( 'hex' ).slice( -32 ).toUpperCase()
    const body = {
      appid: APPID,
      mchid: MCHID,
      description: `${total_userId[1]},消费了${total / 100}元`,
      out_trade_no: randStr,
      notify_url: 'https://bb.kknd0.cn/wechatpaycb',
      amount: {
        total: total,
        currency: 'CNY',
      },
      payer: {
        openid,
      },
      attach: `${total_userId[1]}xxx${total}`,
    }

    const str = `POST\n/v3/pay/transactions/jsapi\n${appTime}\n${randStr}\n${JSON.stringify(
      body
    )}\n`
    const privateKey = fs.readFileSync(
      path.join( process.cwd(), 'wechatkey', 'apiclient_key.pem' ),
      'utf-8'
    )
    const signature = crypto
      .createSign( 'RSA-SHA256' )
      .update( str )
      .sign( privateKey, 'base64' )
    const authorheader = `mchid=\"${MCHID}\",nonce_str=\"${randStr}\",signature=\"${signature}\",timestamp=\"${appTime}\",serial_no=\"${SERIAL_NO}\"`
    const res = await fetch(
      'https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `WECHATPAY2-SHA256-RSA2048 ${authorheader}`,
        },
        body: JSON.stringify( body ),
      }
    )
    const res1 = await res.json()
    const { prepay_id } = res1
    if ( prepay_id ) {
      const preSign = `${APPID}\n${appTime}\n${randStr}\nprepay_id=${prepay_id}\n`
      const paySign = crypto
        .createSign( 'RSA-SHA256' )
        .update( preSign )
        .sign( privateKey, 'base64' )

      const signs = {
        appId: APPID,
        timeStamp: appTime,
        nonceStr: randStr,
        package: 'prepay_id=' + prepay_id,
        signType: 'RSA',
        paySign: paySign,
      }
      data = signs
    }
  }
  return {
    props: {
      data,
      total,
      userId: total_userId[1],
    },
  }
}

export default withUrqlClient( ( _ssrExchange, ctx ) => ( {
  url: 'https://abba.kknd0.cn/graphql',
} ) )( wepay );
