import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import QRcode from 'qrcode.react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useGetPaysuccessnoticeSubscription } from '../generated/graphql'

interface indexProps { }

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const index: NextPage<indexProps> = () => {
	const [{ fetching: fetchings, data: datas }] = useGetPaysuccessnoticeSubscription()
	const [total, setTotal] = useState( 1 )
	const [input, setInput] = useState( '' )
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				border: '1px solid #cccccc',
				width: '300px',
				padding: '15px',
				margin: '0 auto',
			}}
		>
			<div>
				<h1>请输入金额：</h1>
				<form
					onSubmit={( event ) => {
						event.preventDefault()
						const total = parseInt( ( parseFloat( input ) * 100 ).toString() )
						setTotal( total )
					}}
				>
					<input
						style={{ border: '1px solid #cccccc' }}
						placeholder='金额'
						type='text'
						onChange={( e ) => {
							setInput( e.target.value )
						}}
					/>
				</form>
			</div>
			<h1>扫码支付</h1>
			<QRcode
				value={`http://aa.kknd0.cn/pay?userId=0001&total=${total}`}
				style={{ padding: '5px' }}
			/>
			{!datas ? (
				<p>支持微信/支付宝</p>
			) : (
				<div style={{ width: '300px', background: '#f4f4f4f4' }}>
					<div>支付方式:{datas.getPaysuccessnotice.payMethod}</div>
					<div>支付金额:{datas.getPaysuccessnotice.total}</div>
					<div>描述:{datas.getPaysuccessnotice.description}</div>
				</div>
			)}
		</div>
	)
}

export default withUrqlClient( ( _ssrExchange, ctx ) => ( {
	url: 'https://abba.kknd0.cn/graphql',
} ) )( index );

