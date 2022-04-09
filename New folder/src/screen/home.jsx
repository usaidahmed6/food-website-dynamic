import './Restaurant.css'
import React, { useEffect, useState } from 'react';
import { Spin, Card, Avatar, } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import Meta from 'antd/lib/card/Meta';
import iconFood1 from '../screen/images/step-1.jpg';
import iconFood2 from '../screen/images/step-2.jpg';
import iconFood3 from '../screen/images/step-3.jpg';
import iconFood4 from '../screen/images/step-4.jpg';
import iconFood from '../screen/images/food-icon.png';
import iconEnter from '../screen/images/enterIcon.png';
import pic1 from '../screen/images/pic1.png';
import pic2 from '../screen/images/pic2.png';
import loader from '../screen/images/loader.gif';
import pic3 from '../screen/images/pic3.png';
import { useParams } from 'react-router-dom'
import './home.css'

import home_pic from './images/home-img.png';
import restaurant_pic from './images/s-1.png';

import { getDocs, userRef, collection, db, onSnapshot } from './firebase';

export const Home = () => {

    const [res, setRes] = useState([false])
    const [userUid, setuseruid] = useState()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    // console.log('uid===>', params)
    const navigate = useNavigate()


    useEffect(() => {

        setLoading(true)

        setTimeout(() => {
            setLoading(false)

        }, 4000)


        onSnapshot(
            collection(db, "AddDishes"),
            (snapshot) => {
                getRestaurant()

            },
            (error) => {
                alert(error)
            });

    }, [userUid])






    const getRestaurant = async () => {
        setLoading(true)
        const querySnapshot = await getDocs(userRef);
        let products = []
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() })
        });
        setRes(products)
        setTimeout(() => {
            setLoading(false)

        })
    }

    const useruid = (id) => {
        // console.log('uid hey ????==', id);

        // setuseruid(uid)

        navigate(`/Restaurantdetails/${id}`)
    }

    // console.log('====', userUid)
    const uid = userUid

    return (
        <div className='main'>
            <section className="home" id="home">

                <div className="content">
                    <h3>food made with love</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas accusamus tempore temporibus rem amet laudantium animi optio voluptatum. Natus obcaecati unde porro nostrum ipsam itaque impedit incidunt rem quisquam eos!</p>

                </div>

                <div className="image">
                    <img src={home_pic} alt="food image" />
                </div>

            </section>

            {/* restaurant  */}
            {
                loading ?
                    <div className="loader-container">
                        <img src={loader} alt="" />
                    </div>
                    :
                    <>

                        <h1 className="heading h-r"> our <span>Restaurant</span> </h1>
                        <section className="speciality" id="speciality"
                        >



                            <div className="box-container">

                                {
                                    res.map((data, index) => {
                                        return (

                                            <div className="box"
                                                key={index}
                                                onClick={() => useruid(data.id)}
                                            >
                                                <img className="image" src={data.restaurantImg} alt="restaurant image" />
                                                <div className="content">
                                                    <img src={restaurant_pic} alt="icon" />
                                                    <h3>{data.name}</h3>
                                                    <p>{data.desc}</p>
                                                </div>
                                            </div>


                                        )
                                    })
                                }
                            </div>

                        </section>

                    </>
            }
            <div className="step-container">

                <h1 className="heading">how it <span>works</span></h1>

                <section className="steps">

                    <div className="box">
                        <img src={iconFood1} />
                        <h3>choose your favorite food</h3>
                    </div>
                    <div className="box">
                        <img src={iconFood2} />
                        <h3>free and fast delivery</h3>
                    </div>
                    <div className="box">
                        <img src={iconFood3} />
                        <h3>easy payments methods</h3>
                    </div>
                    <div className="box">
                        <img src={iconFood4} />
                        <h3>and finally, enjoy your food</h3>
                    </div>

                </section>

            </div>




            <section className="review" id="review">

                <h1 className="heading"> our customers <span>reviews</span> </h1>

                <div className="box-container">

                    <div className="box">
                        <img src={pic1} />
                        <h3>john deo</h3>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti delectus, ducimus facere quod ratione vel laboriosam? Est, maxime rem. Itaque.</p>
                    </div>
                    <div className="box">
                        <img src={pic2} />
                        <h3>usaid ahmed</h3>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti delectus, ducimus facere quod ratione vel laboriosam? Est, maxime rem. Itaque.</p>
                    </div>
                    <div className="box">
                        <img src={pic3} />
                        <h3>john deo</h3>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti delectus, ducimus facere quod ratione vel laboriosam? Est, maxime rem. Itaque.</p>
                    </div>

                </div>

            </section>




        </div>
    )
}
