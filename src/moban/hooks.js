// hooks
// 函数经过 useState后可以返回数据


//useProductData.jsx
 
import React from 'react'
import { getProductList } from '../../module/product'
import {useState,useEffect} from 'react'
 
export default function useProductData(){
  const [proList,setProductList] = useState([])
  useEffect(()=>{
    getProductList().then(list => {
      setProductList(list)
    })
  },[])
 
  return proList //返回列表数据
}



//use
import useProductData from './components/ProductListHooks/useProductData'
import AdminProductList from './components/AdminProductList'
import FrontProductList from './components/FrontProductList'
 
 
function App(){
  const prolist = useProductData()
     return <AdminProductList proList={prolist}/>
}