import { getDocs, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { userRef4, auth, deleteDoc, doc, db, userRef5, addDoc } from './firebase';
import { Spin, Card, Image, } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useParams } from 'react-router-dom';






const Shopping = () => {
    const [orderNow, setOrderNow] = useState([false])
    const [loading, setLoading] = useState(false)
    const params = useParams()
    console.log('id hey ?===>===>', params);


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)

        }, 4000)
        getOrder()
    }, [])

    const getOrder = async () => {
        const q = query(userRef4, where("uid", "==", auth.currentUser.uid))
        const querySnapshot = await getDocs(q);
        let order = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            order.push({ id: doc.id, ...doc.data() })
        });
        setOrderNow(order)
        console.log('price==', order[0].price)
    }

    const deleteDocument = async (id) => {
        console.log('id user', auth.currentUser.uid);

        if (id) {
            alert('order success full')
            let obj = {
                orderName: orderNow[0].name,
                orderprice: orderNow[0].price,
                orderUid: orderNow[0].uid
            }
            addDoc(userRef5, obj)
            const deleted = await deleteDoc(doc(db, "shoppnigCard", id));
            console.log("=>", deleted);
            console.log(id);
        }
        else {
            alert('order not receved')

        }


    }
    return (
        <div className='main'>

            {
                loading ?
                    <div> <Spin size='large' className='spin' /></div>
                    :
                    <div>


                        {
                            orderNow.map((data, index) => {
                                return (
                                    <>
                                        <Card
                                            className='card-div-shop '
                                            key={index}

                                        >
                                            <Meta

                                                title={data.name}

                                            />

                                            <Image

                                                src={data.image}
                                                className={'shop_img'}

                                            />
                                            <span>$ {data.price}</span>
                                            <p className='para'>{data.description} </p>
                                            <button className="btn btn-danger btn-sm order-btn" onClick={() => deleteDocument(data.id)}>order</button>

                                        </Card>



                                    </>


                                )
                            })
                        }
                    </div>
            }

        </div>
    )
}

export default Shopping
