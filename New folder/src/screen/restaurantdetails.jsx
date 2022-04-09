import React, { useEffect, useState } from 'react';
import { Spin, } from 'antd';
import { useNavigate } from 'react-router-dom'
import './Restaurant.css'
import { Button, Modal, Form, Input, Radio } from 'antd';
import { useParams } from 'react-router-dom'
import { userRef3, getDocs, getDoc, collection, db, onSnapshot, userRef4, doc } from './firebase';
import { addDoc, query, where } from 'firebase/firestore';
import loader from '../screen/images/loader.gif';






export const Restaurantdetails = () => {


    const [res, setRes] = useState([false])
    const [restaurentUid, setRestaurentUid] = useState('')
    const [shop, setShop] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    console.log('id hey ===>', params);
    const docRef = doc(db, "Restaurant", params.id);



    useEffect(() => {

        setLoading(true)
        setTimeout(() => {
            setLoading(false)

        }, 4000)
        onSnapshot(
            collection(db, "AddDishes"),
            (snapshot) => {
                getDishe()
                // getRestaurant()
            },
            (error) => {
                alert(error)
            });

    }, [])

    let resturantsUid;



    const getDishe = async () => {
        const dishes = await getDoc(docRef)
        console.log('object of restaurent=>', dishes.data().uid)
        resturantsUid = dishes.data().uid
        console.log('uidddd==============================================>', resturantsUid)

        const q = query(userRef3, where("uid", "==", resturantsUid))

        const querySnapshot = await getDocs(q);
        let dish = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log(doc.id, " => ", doc.data());
            dish.push({ id: doc.id, ...doc.data() })
        });
        setRes(dish)
        // console.log('pppppppppppppppp===>', dish[0].price)
    }

    // const goToDishPage = (dish) => {
    //     console.log('dishhhhhhh==>', dish)
    //     // console.log('res==========>', res)
    //     navigate(`/Restaurantdetails/${dish.collectionName}/${dish.id}`)
    // }

    const hendleorder = (e) => {
        // setShop(shop + 1)
        // console.log('collectionName', e.collectionName);
        // console.log('description', e.description);
        // console.log('id', e);
        // console.log('collectionImage', e.collectionImage);
        // console.log('price', e.price);
        // console.log('shop', shop);
        console.log('uid?==>', e.uid);
        console.log('id========>', e.id);
        const obj = {
            name: e.collectionName,
            description: e.description,
            image: e.collectionImage,
            price: e.price,
            order: shop,
            uid: e.uid,
            // id: e.id,

        }
        addDoc(userRef4, obj)


    }






    return (
        <div className='main' >
            {
                loading ?
                    <div className="loader-container">
                        <img src={loader} alt="" />
                    </div>
                    :
                    <div className="main-div-hohe">

                        <section className="popular" id="popular">
                            <h1 className="heading"> most <span>popular</span> foods </h1>


                            <div className="box-container">
                                {
                                    res.map((data, index) => {

                                        return (

                                            <div className="box" key={index}>
                                                <span className="price"> $ {data.price}</span>
                                                <img src={data.collectionImage} alt="food image" />
                                                <h3>{data.collectionName}</h3>
                                                <div className="stars">
                                                    <p>
                                                        {data.description}
                                                    </p>
                                                </div>
                                                <b className="btn-co" onClick={() => hendleorder(data)}>order now</b>
                                            </div>


                                        )
                                    })
                                }
                            </div>
                        </section>
                    </div>

            }
        </div >
    );
}
